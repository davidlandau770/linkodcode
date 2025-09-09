import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUsersDB, addUserDB, getMaxIdDB } from "../DAL/accountDAL.js";

const signup = async (req, res) => {
    let response;
    try {
        response = await getUsersDB();
    } catch (error) {
        return res.status(500).json({ err: `getUsers: ${error}` });
    }
    let responseMaxID
    try {
        responseMaxID = await getMaxIdDB();
    } catch (error) {
        return res.status(500).json({ err: `getMaxIdUsers: ${error}` });
    }
    
    const id = responseMaxID[0]?.id ? responseMaxID[0].id + 1 : 1;
    const name = req.body.username;
    const user = response.some(user => user.username === name)
    if (user) {
        return res.status(409).json({ msg: "The username already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newuser = {
        id: id,
        username: name,
        password: hashedPassword,
    }
    let result
    try {
        result = await addUserDB(newuser);
    } catch (error) {
        return res.status(500).json({ err: `Failed write data: ${error}` });
    }
    console.log(newuser);
    res.status(200).json({ msg: "successfully registered!" });
}

const login = async (req, res) => {
    const name = req.body.username;
    const password = req.body.password;
    let response;
    try {

        response = await getUsersDB();
    } catch (error) {
        return res.status(500).json({ err: `getUsers: ${error}` });
    }

    const currentUser = response.find(user => user.username === name);
    if (!currentUser) return res.status(404).json({ msg: "User not found" });
    const hashedPassword = currentUser.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    let token;
    try {
        token = createToken(currentUser);
    } catch (error) {
        return res.status(401).json({ getToken: error })
    }
    delete currentUser.password;
    res.cookie("token", token, { httpOnly: true }).json({ msg: "Verified", currentUser });
}

const logout = (req, res) => {
    res.clearCookie("token").json({ msg: "Logged out" });
}

const createToken = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            permission: user.permission,
        },
        process.env.JWT_SECRET,
        { expiresIn: "10h" }
    );
    return token
}

export {
    signup,
    login,
    logout,
}