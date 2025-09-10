import { Link } from "react-router"
import "./header.css"
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function Header() {
  const URL = "http://localhost:3000"
  const auth = useContext(AuthContext);

  return (
    <header>
      <Link to={'/'} className="divLinkHome"><img className="logo" src={`${URL}/logo.jpg`} alt="logo" /><p>Home</p></Link>
      <h3 className="titleSite">Linkodcode</h3>
      <Link to={'/add post'} className="addPostLink">Add post</Link>
      {auth?.user?.username && <Link to={'/account'}><p className="username">{auth.user.username}</p></Link>}
      {!auth?.user?.username && <Link to={'/account'}><img className="iconAccount" src={`${URL}/account.png`} alt="icon account" /></Link>}
    </header>
  )
}
