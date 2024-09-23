import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../store/hooks/useAuth"
import "../css/main.css"
import { FaCircleUser } from "react-icons/fa6"
import { PiSignOutLight } from "react-icons/pi"

const Header: React.FC = () => {
  const { user, isAuthenticated, logoutUser } = useAuth()
  const location = useLocation()
  const currentPath = location.pathname

  const handleLogout = () => {
    logoutUser()
  }
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="./src/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="main-nav-profile">
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <FaCircleUser color="#e2e2ee" size={25} />
              {user?.firstName ? capitalizeFirstLetter(user.firstName) : ""}
            </Link>
            <button className="main-nav-item" onClick={handleLogout}>
              <PiSignOutLight size={25} />
              Sign Out
            </button>
          </>
        ) : currentPath === "/" ? (
          <>
            <Link className="main-nav-item" to="/login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
            <Link className="main-nav-item" to="/register">
              <i className="fa fa-user-plus"></i>
              Register
            </Link>
          </>
        ) : currentPath === "/login" ? (
          <Link className="main-nav-item" to="/register">
            <i className="fa fa-user-plus"></i>
            Register
          </Link>
        ) : currentPath === "/register" ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        ) : null}
      </div>
    </nav>
  )
}

export default Header
