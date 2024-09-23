import React, { useState } from "react"
import { useAuth } from "../store/hooks/useAuth"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
  const { login, error } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await login({ email, password })
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/profile")
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            {error && <p>{error}</p>}
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Username"
              required
              autoComplete="username"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoComplete="current-password"
            />
          </div>
          <button className="sign-in-button" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
