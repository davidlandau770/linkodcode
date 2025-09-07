import { Link } from "react-router"
import "./header.css"

export default function Header() {
  return (
    <header>
        <Link to={'/'}><img className="logo" src="logo.jpg" alt="logo" /></Link>
        <h3>Linkodcode</h3>
        <img className="iconAccount" src="account.png" alt="icon account" />
    </header>
  )
}
