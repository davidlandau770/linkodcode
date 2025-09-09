import { useEffect, useState } from "react";
import "./post.css";
import type { TypePost } from "../../pages/Posts";

export default function Post({ img_url, description, count_likes, count_dislikes, timestamp, username }: TypePost) {
    const [like, setLike] = useState<string>("off");
    const [dislike, setDislike] = useState<string>("off");
    const [countLikes, setCountLikes] = useState(0);
    const [countDisikes, setCountDisikes] = useState(0);
    
    useEffect(() => {
        setCountLikes(count_likes)
        setCountDisikes(count_dislikes)
    }, [])

    const addLike = () => {
        if (like === "off") {
            setLike("on");
            setCountLikes((prev) => prev + 1)
            if (dislike === "on") {
                setDislike("off");
                setCountDisikes((prev) => prev - 1);
            }
        }
        else {
            setLike("off");
            setCountLikes((prev) => prev - 1);
        }
    }

    const addDislike = () => {
        if (dislike === "off") {
            setDislike("on");
            setCountDisikes((prev) => prev + 1);
            if (like === "on") {
                setLike("off");
                setCountLikes((prev) => prev - 1);
            }
        }
        else {
            setDislike("off");
            setCountDisikes((prev) => prev - 1);
        }
    }

    return (
        <div className="post">
            <img className="postimg" src={`http://localhost:3000/${img_url}.png`} alt="post img" />
            <p className="descriptionPost">{description}</p>
            <div className="likes">
                <div className="divCountLike">
                    <img className="imgLike" src={`${like} like.png`} alt="like" onClick={addLike} />
                    {countLikes > 0 && <p>{countLikes}</p>}
                </div>
                <div className="divCountLike">
                    <img className="imgLike" src={`${dislike} dislike.png`} alt="dislike" onClick={addDislike} />
                    {countDisikes > 0 && <p>{countDisikes}</p>}
                </div>
            </div>
            <p className="aboutPost"><span className="userName">{username}</span><span className="datePost">{timestamp}</span></p>
        </div>
    )
}
