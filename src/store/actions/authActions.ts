import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../axiosConfig"
import { LoginResponse, LoginCredentials, User, AuthState } from "../../types"

export const loginAsync = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/loginAsync", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post<LoginResponse>(
      "/user/login",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    )
    return response.data.body
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed")
  }
})

export const fetchProfileAsync = createAsyncThunk<
  User,
  void,
  { state: { auth: AuthState }; rejectValue: string }
>("auth/fetchProfileAsync", async (_, { getState, rejectWithValue }) => {
  try {
    const response = await axios.get("/user/profile")
    return response.data.body
  } catch (error) {
    return rejectWithValue("Failed to fetch profile")
  }
})

export const updateProfileAsync = createAsyncThunk<
  User,
  Partial<User>,
  { state: { auth: AuthState }; rejectValue: string }
>(
  "auth/updateProfileAsync",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put("/user/profile", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      return response.data.body
    } catch (error) {
      return rejectWithValue("Failed to update profile")
    }
  },
)
