import { Link } from "react-router"
import "./header.css"
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

export default function Header() {
  const auth = useContext(AuthContext);

  return (
    <header>
      <Link to={'/'}><img className="logo" src="logo.jpg" alt="logo" /></Link>
      <h3>Linkodcode</h3>
      {auth?.user?.username && <Link to={'/account'}><p className="username">{auth.user.username}</p></Link>}
      {!auth?.user?.username && <Link to={'/account'}><img className="iconAccount" src="account.png" alt="icon account" /></Link>}
    </header>
  )
}
