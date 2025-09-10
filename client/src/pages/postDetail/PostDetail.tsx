import { useContext, useEffect, useState } from "react";
import type { TypePost } from "../posts/Posts";
import { useNavigate, useParams } from "react-router";
import "./postDetail.css";
import { AuthContext } from "../../context/AuthContext";

export default function PostDetail() {
    const URL = "http://localhost:3000";
    const params = useParams()
    const [posts, setPosts] = useState<TypePost>();
    const [hidden, setHidden] = useState<"hidden" | "">("");
    const [show, setShow] = useState<"hidden" | "">("hidden");
    const [error, setError] = useState<string>("");
    const [like, setLike] = useState<string>("off");
    const [dislike, setDislike] = useState<string>("off");
    const [countLikes, setCountLikes] = useState<number>(0);
    const [countDisikes, setCountDisikes] = useState<number>(0);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const loadPost = async () => {
        let data;
        try {
            const response = await fetch(`${URL}/post/${params.postId}`, { credentials: "include" })
            data = await response.json();
        }
        catch {
            console.error("error")
        }

        setHidden("hidden");
        if (data.err) {
            setError(data.err)
        }
        else {
            setShow("")
            setPosts(data)
        }
    }

    useEffect(() => {
        loadPost();
    }, [])
    useEffect(() => {
        setCountLikes(posts?.count_likes ? posts?.count_likes : 0)
        setCountDisikes(posts?.count_dislikes ? posts?.count_dislikes : 0)
    }, [posts])


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

    !auth?.user?.username && navigate("/account");

    return (
        <>
            <h3 className={`loading ${hidden}`}>Loading post... <img className='imgLoading' src={`${URL}/loading.gif`} alt='loading icon' /></h3>
            {error !== "" && <h3 className="error">{error}</h3>}
            <div className={`postDetail ${show}`}>
                <img className="postImg spacePostDetail" src={`http://localhost:3000/${posts?.img_url}.png`} alt="post img" />
                <p className="descriptionPost">{posts?.description}</p>
                <hr className="hr" />
                <div className="likes">
                    <div className="divCountLike spacePostDetail">
                        <img className="imgLike" src={`${URL}/${like} like.png`} alt="icon like" onClick={addLike} />
                        {countLikes > 0 && <p className="countLike">{countLikes}</p>}
                    </div>
                    <div className="divCountLike spacePostDetail">
                        <img className="imgLike" src={`${URL}/${dislike} dislike.png`} alt="icon dislike" onClick={addDislike} />
                        {countDisikes > 0 && <p className="countLike">{countDisikes}</p>}
                    </div>
                </div>
                <p className="aboutPost"><span className="userName">{posts?.username}</span><span className="datePost">{posts?.timestamp}</span></p>
            </div>
        </>
    )
}
