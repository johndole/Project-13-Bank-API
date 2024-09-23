export interface User {
  email: string
  username?: string
  firstName: string
  lastName: string
}

export interface UserName {
  firstName: string
  lastName: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
  body: LoginResponse
}
