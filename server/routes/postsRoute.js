import express from "express";
import { addDislikeToPost, addLikeToPost, createPost, readPost, readPosts } from "../controller/postsCtrl.js";

const post = express.Router();
post.post('/post', createPost);
post.get('/posts', readPosts);
post.get('/post/:id', readPost);
post.post('/post/addLike', addLikeToPost);
post.post('/post/addDislike', addDislikeToPost);

export {
    post
}
