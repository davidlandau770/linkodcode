import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router";
import "./userDetail.css";

export default function UserDetail() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    !auth?.user?.username && navigate("/account");
  }, [navigate])
  !auth?.user?.username && navigate("/account");

  return (
    <div className="userPage">
      <h3>hello {auth?.user?.username}</h3>
      <p className="textUserPage">There's nothing you can do here, but you can stay.</p>
      <Link className="link" to={"/logout"}><button className="btnLogout">logout</button></Link>
    </div>
  )
}
