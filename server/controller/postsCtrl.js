import { getUsersDB } from "../DAL/accountDAL.js";
import { createPostDB, deletePostDB, readPostsDB, updatePostDB } from "../DAL/postsDAL.js";

const createPost = async (req, res) => {
    let response;
    try {
        response = await createPostDB();
    } catch (error) {
        return res.status(500).json({ err: `createPost: ${error}` });
    }

}

const readPosts = async (req, res) => {
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

const updatePost = async (req, res) => {
    let response;
    try {
        response = await updatePostDB();
    } catch (error) {
        return res.status(500).json({ err: `updatePost: ${error}` });
    }

}

const deletePost = async (req, res) => {
    let response;
    try {
        response = await deletePostDB();
    } catch (error) {
        return res.status(500).json({ err: `deletePost: ${error}` });
    }

}

export {
    createPost,
    readPosts,
    updatePost,
    deletePost
}
