import { useState } from "react";
import "./post.css";
import type { TypePost } from "../../pages/Posts";

export default function Post({ img_url, description, count_likes, count_dislikes, username_id, timestamp}: TypePost) {
    const [like, setLike] = useState<string>("off");
    const [dislike, setDislike] = useState<string>("off");
    
    return (
        <div className="post">
            <img className="postimg" src={`http://localhost:3000/${img_url}.png`} alt="post img" />
            <p className="descriptionPost">{description}</p>
            <div className="likes">
                <img className="imgLike" src={`${like} like.png`} alt="like" onClick={() => {
                    if (like === "off") {
                        setLike("on");
                        setDislike("off")
                    }
                    else {
                        setLike("off")
                    }
                }} />
                <img className="imgLike" src={`${dislike} dislike.png`} alt="dislike" onClick={() => {
                    if (dislike === "off") {
                        setDislike("on");
                        setLike("off")
                    }
                    else {
                        setDislike("off")
                    }
                }} />
            </div>
            <p className="aboutPost"><span className="userName">{username_id}</span><span className="datePost">{timestamp}</span></p>
        </div>
    )
}
