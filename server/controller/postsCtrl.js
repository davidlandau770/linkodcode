import { getUsersDB } from "../DAL/accountDAL.js";
import { createPostDB, getMaxIdDB, readPostDB, readPostsDB } from "../DAL/postsDAL.js";
import { tokenVerification } from "./accountCtrl.js";

const createPost = async (req, res) => {
    const result = tokenVerification(req.cookies.token);
    if (!result) {
        return res.status(403).json({ msg: "No permission" })
    }

    const body = req.body;
    let responseMaxID
    try {
        responseMaxID = await getMaxIdDB();
    } catch (error) {
        return res.status(500).json({ err: `getMaxIdPosts: ${error}` });
    }
    const img_url = Number(body.imgAddress);
    const id = responseMaxID[0]?.id ? responseMaxID[0].id + 1 : 1;
    if (!body.imgAddress || !body.description || img_url < 0 || img_url > 10) {
        return res.status(400).json({ msg: `One or more of the values ​​is invalid` });
    }
    const obj = {
        id: id,
        img_url: body.imgAddress,
        description: body.description,
        username_id: 1,
        count_likes: 0,
        count_dislikes: 0,
        timestamp: new Date().toLocaleString()
    }
    try {
        await createPostDB(obj);
    } catch (error) {
        return res.status(500).json({ err: `createPost: ${error}` });
    }
    res.status(200).json({ msg: "Upload completed successfully!" })
}

const readPosts = async (req, res) => {
    const result = tokenVerification(req.cookies.token);
    if (!result) {
        return res.status(403).json({ msg: "No permission" })
    }

    let responsePosts;
    try {
        responsePosts = await readPostsDB();
    } catch (error) {
        return res.status(500).json({ err: `readPosts: ${error}` });
    }
    let responseUsers;
    try {
        responseUsers = await getUsersDB();
    } catch (error) {
        return res.status(500).json({ err: `getUsers: ${error}` });
    }
    responsePosts.map((obj) => {
        const findUser = responseUsers.find((user) => user.id === obj.username_id)
        obj.username = findUser.username
    })
    res.json(responsePosts);
}

const readPost = async (req, res) => {
    const result = tokenVerification(req.cookies.token);
    if (!result) {
        return res.status(403).json({ msg: "No permission" })
    }

    const postId = req.params.id;
    const numPostId = Number(postId);
    let responsePost;
    try {
        responsePost = await readPostDB(numPostId);
    } catch (error) {
        return res.status(500).json({ err: `readPostDB: ${error}` });
    }
    if (responsePost === null) {
        return res.status(400).json({ msg: `invalid param` });
    }
    let responseUsers;
    try {
        responseUsers = await getUsersDB();
    } catch (error) {
        return res.status(500).json({ err: `getUsers: ${error}` });
    }
    const findUser = responseUsers.find((user) => user.id === responsePost.username_id)
    responsePost.username = findUser.username

    res.json(responsePost);
}

export {
    createPost,
    readPosts,
    readPost
}
