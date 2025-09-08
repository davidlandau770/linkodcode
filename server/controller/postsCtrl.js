import { createPostDB, deletePostDB, readPostsDB, updatePostDB } from "../DAL/postsDAL.js";

const createPost = async (req, res) => {
    let response;
    try {
        response = await createPostDB();
    } catch (error) {
        return res.status(500).json({ msg: `createPost: ${error}` });
    }

}

const readPosts = async (req, res) => {
    let response;
    try {        
        response = await readPostsDB();
    } catch (error) {
        return res.status(500).json({ msg: `readPosts: ${error}` });
    }
    res.json(response);
}

const updatePost = async (req, res) => {
    let response;
    try {
        response = await updatePostDB();
    } catch (error) {
        return res.status(500).json({ msg: `updatePost: ${error}` });
    }

}

const deletePost = async (req, res) => {
    let response;
    try {
        response = await deletePostDB();
    } catch (error) {
        return res.status(500).json({ msg: `deletePost: ${error}` });
    }

}

export {
    createPost,
    readPosts,
    updatePost,
    deletePost
}
