import { useContext, useEffect, useState } from 'react';
import Post from '../../comps/post/Post';
// import myData from '../db/data.json';
import "./posts.css";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

export type TypePost = {
    id: number;
    img_url: string;
    description: string;
    count_likes: number;
    count_dislikes: number;
    state_like: string;
    state_dislike: string;
    timestamp: string;
    username: string;
}

export default function Posts() {
    const URL = "http://localhost:3000";
    const [posts, setPosts] = useState<TypePost[]>([]);
    const [hidden, setHidden] = useState<"hidden" | "">("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const getAllPost = async () => {
        let data;
        try {
            const response = await fetch(`${URL}/posts`, { credentials: "include" })
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
            setPosts(data)
        }
    }

    useEffect(() => {
        getAllPost();
    }, [])

    !auth?.user?.username && navigate("/account");

    return (
        <>
            <div className='posts'>
                <h3 className={`loading ${hidden}`}>Loading posts... <img className='imgLoading' src={`${URL}/loading.gif`} alt='loading' /></h3>
                {error !== "" && <h3 className="error">{error}</h3>}
                {posts.map((obj) => (
                    <div className='divPost' key={obj.img_url}>
                        <Post id={obj.id} img_url={obj.img_url} description={obj.description} count_likes={obj.count_likes} count_dislikes={obj.count_dislikes} state_like={obj.state_like} state_dislike={obj.state_dislike} timestamp={obj.timestamp} username={obj.username} />
                    </div>
                ))}
            </div>
        </>
    )
}
