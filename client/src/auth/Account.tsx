import { Link } from "react-router";
import "./account.css"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Account() {
  const auth = useContext(AuthContext);

  return (
    <div className="account">
      <h2 className="titleAccount">Account:</h2>
      {!auth?.user?.username && <Link className="link" to={"/login"}><button className="btnAccount">login</button></Link>}
      {!auth?.user?.username && <Link className="link" to={"/register"}><button className="btnAccount">register</button></Link>}
      {auth?.user?.username && <p className="connectedAs">Connected as <Link className="link" to={`/users/${auth.user.username}`}>{auth.user.username}</Link></p>}
      {auth?.user?.username && <Link className="link" to={"/logout"}><button className="btnAccount">logout</button></Link>}
    </div>
  )
}
