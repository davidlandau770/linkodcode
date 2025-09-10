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
        console.log(data);

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

    return (
        <>
            {!auth?.user?.username && navigate("/account")}
            <div className='posts'>
                <h3 className={`loading ${hidden}`}>Loading posts... <img className='imgLoading' src={`${URL}/loading.gif`} alt='loading' /></h3>
                {error !== "" && <h3 className="error">{error}</h3>}
                {posts.map((obj) => (
                    <div className='divPost' key={obj.img_url}>
                        <Post id={obj.id} img_url={obj.img_url} description={obj.description} count_likes={obj.count_likes} count_dislikes={obj.count_dislikes} timestamp={obj.timestamp} username={obj.username} />
                    </div>
                ))}
            </div>
        </>
    )
}
