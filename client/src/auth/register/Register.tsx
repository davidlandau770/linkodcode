import { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router";
import { URL, type Account, type Data } from "../login/Login";
import { AuthContext } from "../../context/authContext";

export default function Register() {
  const auth = useContext(AuthContext);
  const [note, setNote] = useState<Account>({ username: "", password: "" });
  const [addClassData, setAddClassData] = useState("");
  const [resultServer, setResult] = useState<string>("");
  const account = useRef<Account>({ username: "", password: "" });
  const navigate = useNavigate();

  const fetchRegister = async () => {
    let data: Data;
    setNote({ username: "", password: "" });
    if (account.current.username && account.current.password) {
      try {
        const response = await fetch(`${URL}/signup`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(account.current),
          credentials: "include"
        })
        data = await response.json();
        
        auth?.setUser({ ...auth.user, ["username"]: data?.currentUser?.username, ["permission"]: data?.currentUser?.permission })

        if (data.msg === "The username already exists") {
          setAddClassData("errorDivAccount");
          setNote({ ...note, ["username"]: data.msg, ["password"]: "" });
          setTimeout(() => {
            setAddClassData("");
          }, 200);
        }
        else if (data.msg === "successfully registered!") {
          setAddClassData("goodDivAccount");
          setResult("successfully registered!")
          setTimeout(() => {
            navigate("/");
            setAddClassData("");
          }, 1000);
        }
        else {
          setNote({ ...note, ["username"]: "", ["password"]: "" })
        }
      } catch (error) {
        console.error(`register: ${error}`);
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
      <h1 className="titleAccount">Register:</h1>
      <form onSubmit={(e) => { e.preventDefault(); fetchRegister(); }}>
        <div className="inputsAccount">
          <p className="resultAccount">{resultServer}</p>
          <label className="labelAccount" htmlFor="username">User name<span className="redColor">*</span>:</label>
          <input className="inputAccount" id="username" name="username" placeholder="Enter user name" onChange={(e) => account.current.username = e.target.value} />
          <p className="errorsAccount">{note.username}</p>
          <label className="labelAccount" htmlFor="password">password<span className="redColor">*</span>:</label>
          <input className="inputAccount" id="password" name="password" placeholder="Enter password" onChange={(e) => account.current.password = e.target.value} />
          <p className="errorsAccount">{note.password}</p>
          <Link to={"/login"} className="toTurnPageAccount">Have you already registered?<img src="link.png" /></Link>
        </div>
        <button className="btnAccount" type="submit">Register</button>
      </form>
    </div>
  )
}
