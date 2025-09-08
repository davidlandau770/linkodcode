import { useContext, useRef, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/authContext";

export type Account = {
  username: string;
  password: string;
}

export type User = {
  id: number;
  username: string;
  created_at: string;
  best_time: number;
  permission: "user" | "admin" | "";
};

export type Data = {
  msg: string;
  currentUser: User;
};

export const URL = "http://localhost:3000";

export default function Login() {
  const auth = useContext(AuthContext);
  const [note, setNote] = useState<Account>({ username: "", password: "" });
  const [resultServer, setResult] = useState<string>("");
  const [addClassData, setAddClassData] = useState("");
  const navigate = useNavigate();
  const account = useRef<Account>({ username: "", password: "" });

  const fetchLogin = async () => {
    let data: Data;
    setNote({ username: "", password: "" });
    if (account.current.username && account.current.password) {
      try {

        const response = await fetch(`${URL}/login`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(account.current),
          credentials: "include"
        })
        data = await response.json();

        auth?.setUser({ ...auth.user, ["username"]: data?.currentUser?.username, ["permission"]: data?.currentUser?.permission })

        if (data.msg === "User not found") {
          setAddClassData("errorDivAccount")
          setTimeout(() => {
            setAddClassData("");
          }, 200);
        }
        else if (data.msg === "Unauthorized") {
          setAddClassData("errorDivAccount")
          setTimeout(() => {
            setAddClassData("");
          }, 200);
        }
        else {
          if (data.msg === "Verified") {
            setAddClassData("goodDivAccount");
            setTimeout(() => {
              navigate("/");
              setAddClassData("");
            }, 1000);
          }
        }
        data.msg === "User not found" ? setNote({ ...note, ["username"]: "User not found", ["password"]: "" }) : data.msg === "Unauthorized" ? setNote({ ...note, ["username"]: "", ["password"]: "Unauthorized" }) : data.msg === "Verified" ? setResult("Verified") : setNote({ ...note, ["username"]: "", ["password"]: "" })
      } catch (error) {
        console.error(`login: ${error}`);
      }
    }
    else {
      const errors: { username: string; password: string } = { username: "", password: "" };

      if (!account.current.username) {
        errors.username = "The username is required!";
      }
      if (!account.current.password) {
        errors.password = "The password is required!";
      }
      setNote(errors);
    }
  }

  return (
    <div className={`account ${addClassData}`}>
      <h1 className="titleAccount">Login:</h1>
      <form onSubmit={(e) => { e.preventDefault(); fetchLogin(); }}>
        <div className="inputsAccount">
          <p className="resultAccount">{resultServer}</p>
          <label className="labelAccount" htmlFor="username">User name<span className="redColor">*</span>:</label>
          <input className="inputAccount" id="username" name="username" placeholder="Enter user name" onChange={(e) => account.current.username = e.target.value} />
          <p className="errorsAccount">{note.username}</p>
          <label className="labelAccount" htmlFor="password">password<span className="redColor">*</span>:</label>
          <input className="inputAccount" id="password" name="password" placeholder="Enter password" onChange={(e) => account.current.password = e.target.value} />
          <p className="errorsAccount">{note.password}</p>
          <Link to={"/register"} className="toTurnPageAccount">For quick registration <img src="link.png" /></Link>
        </div>
        <button className="btnAccount" type="submit">Login</button>
      </form>
    </div>
  )
}