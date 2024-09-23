import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { logout } from "../../store/slices/authSlice"
import { LoginCredentials, LoginResponse, User } from "../../types"
import {
  loginAsync,
  fetchProfileAsync,
  updateProfileAsync,
} from "../actions/authActions"
import { useEffect } from "react"

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.user)
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  )
  const error = useSelector((state: RootState) => state.auth.error)

  const login = async (credentials: LoginCredentials) => {
    const result = await dispatch(loginAsync(credentials))
    if (result.meta.requestStatus === "fulfilled") {
      const token = (result.payload as LoginResponse).token
      localStorage.setItem("token", token)
    }
    return result
  }

  const fetchProfile = () => dispatch(fetchProfileAsync())

  const updateProfile = (data: Partial<User>) =>
    dispatch(updateProfileAsync(data))

  const logoutUser = () => {
    localStorage.removeItem("token")
    dispatch(logout())
  }

  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchProfile()
    }
  }, [isAuthenticated, user, dispatch])

  return {
    user,
    isAuthenticated,
    error,
    login,
    fetchProfile,
    updateProfile,
    logoutUser,
  }
}
