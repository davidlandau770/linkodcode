import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import "./logout.css";

export default function Logout() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    auth?.setUser({ username: "", permission: "" })
    const timer = setTimeout(() => {
      navigate("/")
    }, 1800)
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className="account goodDivAccount center">
      <h1 className="titleAccount">You have successfully logged out of your account!</h1>
    </div>
  )
}
