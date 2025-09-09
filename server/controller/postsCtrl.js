import { getUsersDB } from "../DAL/accountDAL.js";
import { createPostDB, deletePostDB, readPostDB, readPostsDB, updatePostDB } from "../DAL/postsDAL.js";

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

const readPost = async (req, res) => {
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
    updatePost,
    deletePost,
    readPost
}
