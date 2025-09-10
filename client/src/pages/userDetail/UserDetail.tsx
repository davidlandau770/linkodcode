import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function UserDetail() {
    const auth = useContext(AuthContext);
  return (
    <>
        { auth?.user?.username && <div>hello {auth?.user?.username}</div> }
    </>
  )
}
