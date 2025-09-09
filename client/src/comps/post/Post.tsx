import { useEffect, useState } from "react";
import "./post.css";
import type { TypePost } from "../../pages/posts/Posts";
import { Link } from "react-router";

export default function Post({ id, img_url, description, count_likes, count_dislikes, timestamp, username }: TypePost) {
    const URL = "http://localhost:3000"
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
        <Link to={`post/${id}`} className="linkPost" >
            <div className="post">
                <img className="postimg" src={`${URL}/${img_url}.png`} alt="post img" />
                <p className="descriptionPost">{description}</p>
                <div className="likes">
                    <div className="divCountLike">
                        <img className="imgLike" src={`${URL}/${like} like.png`} alt="like" onClick={addLike} />
                        {countLikes > 0 && <p className="countLike">{countLikes}</p>}
                    </div>
                    <div className="divCountLike">
                        <img className="imgLike" src={`${URL}/${dislike} dislike.png`} alt="dislike" onClick={addDislike} />
                        {countDisikes > 0 && <p className="countLike">{countDisikes}</p>}
                    </div>
                </div>
                <p className="aboutPost"><span className="userName">{username}</span><span className="datePost">{timestamp}</span></p>
            </div>
        </Link>
    )
}
