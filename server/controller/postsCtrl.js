import { getUsersDB } from "../DAL/accountDAL.js";
import { createPostDB, deletePostDB, getMaxIdDB, readPostDB, readPostsDB, updatePostDB } from "../DAL/postsDAL.js";

const createPost = async (req, res) => {
    const body = req.body;
    let responseMaxID
    let url_img;
    try {
        responseMaxID = await getMaxIdDB();
        url_img = Number(body.url_img);
    } catch (error) {
        return res.status(500).json({ err: `getMaxIdPosts: ${error}` });
    }
    const id = responseMaxID[0]?.id ? responseMaxID[0].id + 1 : 1;
    console.log(body);
    if (!body.url_img || !body.description || url_img < 0 || url_img > 10) {
        return res.status(400).json({ msg: `One or more of the values ​​is invalid` });
    }
    const obj = {
        id: id,
        url_img: body.imgAddress,
        description: body.description,
        username_id: 1,
        count_likes: 0,
        count_dislikes: 0,
        timestamp: new Date().toLocaleString()
    }
    console.log(obj);
    let response;
    try {
        response = await createPostDB(obj);
    } catch (error) {
        return res.status(500).json({ err: `createPost: ${error}` });
    }
    res.status(200).json({ msg: "Upload completed successfully!" })
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
