import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import type { Data } from "../../auth/login/Login";

export type AddPost = {
    imgAddress: string;
    description: string
}

export default function AddPost() {
    const URL = "http://localhost:3000";
    const auth = useContext(AuthContext);
    const [note, setNote] = useState<AddPost>({ imgAddress: "", description: "" });
    const [resultServer, setResult] = useState<string>("");
    const [addClassData, setAddClassData] = useState("");
    const navigate = useNavigate();
    const saveValues = useRef<AddPost>({ imgAddress: "", description: "" });

    const fetchAddPost = async () => {
        let data: Data;
        setNote({ imgAddress: "", description: "" });
        if (saveValues.current.imgAddress && saveValues.current.description) {
            console.log(saveValues.current);
            let response;
            try {
                response = await fetch(`${URL}/post`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(saveValues.current),
                    credentials: "include"
                })
                data = await response.json();

                auth?.setUser({ ...auth.user, ["username"]: data?.currentUser?.username, ["permission"]: data?.currentUser?.permission })

                if (data.msg === "One or more of the values ​​is invalid") {
                    setAddClassData("errorDivAccount")
                    setTimeout(() => {
                        setAddClassData("");
                    }, 200);
                }
                else {
                    if (data.msg === "Upload completed successfully!") {
                        setAddClassData("goodDivAccount");
                        setTimeout(() => {
                            navigate("/");
                            setAddClassData("");
                        }, 1000);
                    }
                }
                data.msg === "One or more of the values ​​is invalid" ? setNote({ ...note, ["imgAddress"]: data.msg, ["description"]: "" }) : data.msg === "Upload completed successfully!" ? setResult(data.msg) : setNote({ ...note, ["imgAddress"]: "", ["description"]: "" })
            } catch (error) {
                console.error(`AddPost: ${error}`);
            }
        }
        else {
            const errors: { imgAddress: string; description: string } = { imgAddress: "", description: "" };

            if (!saveValues.current.imgAddress) {
                errors.imgAddress = "The image address is required!";
            }
            if (!saveValues.current.description) {
                errors.description = "The description is required!";
            }
            setNote(errors);
        }
    }

    return (
        <div className={`account ${addClassData}`}>
            <h1 className="titleAccount">Add post</h1>
            <form onSubmit={(e) => { e.preventDefault(); fetchAddPost(); }}>
                <div className="inputsAccount">
                    <p className="resultAccount">{resultServer}</p>
                    <label className="labelAccount" htmlFor="imgAddress">image address (1 - 10)<span className="redColor">*</span>:</label>
                    <input className="inputAccount" id="imgAddress" name="imgAddress" placeholder="Enter user name" onChange={(e) => saveValues.current.imgAddress = e.target.value} />
                    <p className="errorsAccount">{note.imgAddress}</p>
                    <label className="labelAccount" htmlFor="description">description<span className="redColor">*</span>:</label>
                    <input className="inputAccount" id="description" name="description" placeholder="Enter description" onChange={(e) => saveValues.current.description = e.target.value} />
                    <p className="errorsAccount">{note.description}</p>
                </div>
                <button className="btnAccount" type="submit">submit</button>
            </form>
        </div>
    )
}