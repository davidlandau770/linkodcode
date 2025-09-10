import { Route, Routes } from "react-router";
import Layout from "../comps/application-layout/Layout";
import Posts from "./posts/Posts";
import Account from "../auth/Account";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import Logout from "../auth/logout/Logout";
import PostDetail from "./postDetail/PostDetail";
import AddPost from "./addPost/AddPost";
import UserDetail from "./userDetail/UserDetail";

export default function ConfigRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Posts />} />
                <Route path='/account' element={<Account />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/logout' element={<Logout />} />
                <Route path="/post/:postId" element={<PostDetail />} />
                <Route path="/add post" element={<AddPost />} />
                <Route path="/users/:userId" element={<UserDetail />} />
            </Route>
        </Routes>
    )
}
