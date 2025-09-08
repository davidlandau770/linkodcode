import express from "express";
import { login, logout, signup } from "../controller/accountCtrl.js";

const user = express.Router();

user.post('/signup', signup);
user.post('/login', login);
user.post('/logout', logout);

export {
    user
}
