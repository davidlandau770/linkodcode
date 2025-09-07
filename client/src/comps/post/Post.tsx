import { useState } from "react";
import "./post.css";

type post = {
    img_url: string;
    descripeion: string;
    count_likes: number;
    count_dislike: number;
    username: string;
    timestamp: string;
}

export default function Post({ img_url, descripeion, username, timestamp }: post) {
    const [like, setLike] = useState<string>("off");
    const [dislike, setDislike] = useState<string>("off");

    return (
        <div className="post">
            <img className="postimg" src={img_url} alt="post img" />
            <p className="descriptionPost">{descripeion}</p>
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
            <p className="aboutPost"><span className="userName">{username}</span><span className="datePost">{timestamp}</span></p>
        </div>
    )
}
