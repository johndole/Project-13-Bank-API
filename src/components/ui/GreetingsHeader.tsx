import "../../css/main.css"
import { useAuth } from "../../store/hooks/useAuth"
const GreetingsHeader = () => {
  const { user } = useAuth()
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {user?.firstName || "User"}
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  )
}

export default GreetingsHeader
