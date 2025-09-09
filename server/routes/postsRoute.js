import express from "express";
import { createPost, deletePost, readPost, readPosts, updatePost } from "../controller/postsCtrl.js";

const post = express.Router();
post.post('/post', createPost);
post.get('/posts', readPosts);
post.put('/post/:id', updatePost);
post.delete('/post/:id', deletePost);
post.get('/post/:id', readPost);

export {
    post
}
