import Post from '../comps/post/Post';
import myData  from '../db/data.json';
import "./posts.css";

export default function Posts() {
    
    return (
        <div className='posts'>
            {myData.map((obj) => (
                <div className='divPost' key={obj.id}>
                    <Post img_url={obj.img_url} descripeion={obj.descripeion} count_likes={obj.count_likes} count_dislike={obj.count_dislike} username={obj.username} timestamp={obj.timestamp} />
                </div>
            ))}
        </div>
    )
}
