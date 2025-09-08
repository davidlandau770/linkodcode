import { useEffect, useState } from 'react';
import Post from '../comps/post/Post';
// import myData from '../db/data.json';
import "./posts.css";

export type TypePost = {
    img_url: string;
    description: string;
    count_likes: number;
    count_dislikes: number;
    username_id: number;
    timestamp: string;
}

export default function Posts() {
    const URL = "http://localhost:3000";
    const [posts, setPosts] = useState<TypePost[]>([]);

    useEffect(() => {
        const getAllPost = async () => {
            let data;
            try {
                const response = await fetch(`${URL}/posts`, { credentials: "include" })
                data = await response.json();
            }
            catch {
                console.error("error")
            }
            setPosts(data)
        }

        getAllPost();
    }, [])


    return (
        <div className='posts'>
            {posts.map((obj) => (
                <div className='divPost' key={obj.img_url}>
                    <Post img_url={obj.img_url} description={obj.description} count_likes={obj.count_likes} count_dislikes={obj.count_dislikes} username_id={obj.username_id} timestamp={obj.timestamp} />
                </div>
            ))}
        </div>
    )
}
