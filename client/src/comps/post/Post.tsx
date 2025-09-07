import { useState } from "react";
import "./post.css";

export default function Post() {
    const [like, setLike] = useState<string>("off")
    const [dislike, setDislike] = useState<string>("off")
    return (
        <div className="post">
            <img className="postimg" src="post img.webp" alt="post img" />
            <p className="descryptionPost">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptatibus beatae odio nulla esse expedita!</p>
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
            <p className="aboutPost"><span className="userName">david landau</span><span className="datePost">15:00 17/05/25</span></p>
        </div>
    )
}
