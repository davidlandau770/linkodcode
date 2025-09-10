import { useEffect, useState } from "react";
import "./post.css";
import type { TypePost } from "../../pages/posts/Posts";
import { useNavigate } from "react-router";

export default function Post({ id, img_url, description, count_likes, count_dislikes, timestamp, username }: TypePost) {
    const URL = "http://localhost:3000"
    const [like, setLike] = useState<string>("off");
    const [dislike, setDislike] = useState<string>("off");
    const [countLikes, setCountLikes] = useState(0);
    const [countDisikes, setCountDisikes] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setCountLikes(count_likes)
        setCountDisikes(count_dislikes)
    }, [])

    const addLike = (e: React.MouseEvent<Element, MouseEvent>) => {
        e.stopPropagation();
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

    const addDislike = (e: React.MouseEvent<Element, MouseEvent>) => {
        e.stopPropagation();
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
        <div onClick={() => navigate(`post/${id}`)} className="linkPost" >
            <div className="post">
                <img className="postimg" src={`${URL}/${img_url}.png`} alt="post img" />
                <p className="descriptionPost">{description}</p>
                <div className="likes">
                    <div className="divCountLike">
                        <img className="imgLike" src={`${URL}/${like} like.png`} alt="like" onClick={(e: React.MouseEvent<Element, MouseEvent>) : void => addLike(e)} />
                        {countLikes > 0 && <p className="countLike">{countLikes}</p>}
                    </div>
                    <div className="divCountLike">
                        <img className="imgLike" src={`${URL}/${dislike} dislike.png`} alt="dislike" onClick={(e: React.MouseEvent<Element, MouseEvent>) : void => addDislike(e)} />
                        {countDisikes > 0 && <p className="countLike">{countDisikes}</p>}
                    </div>
                </div>
                <p className="aboutPost"><span className="userName">{username}</span><span className="datePost">{timestamp}</span></p>
            </div>
        </div>
    )
}
