import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthState, LoginResponse, User } from "../../types"
import {
  loginAsync,
  fetchProfileAsync,
  updateProfileAsync,
} from "../actions/authActions"

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
}

// Handles synchronous actions that needs simple state changes
// that don't require server interaction
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },

  //Handles asynchronous actions (thunks) with createAsyncThunk
  //that require server interaction(fetch API)
  extraReducers: builder => {
    builder
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.token = action.payload.token
          state.user = action.payload.user
          state.isAuthenticated = true
          state.error = null
        },
      )
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.payload || "Login failed"
      })
      .addCase(
        fetchProfileAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload
          state.error = null
        },
      )
      .addCase(fetchProfileAsync.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch profile"
      })
      .addCase(
        updateProfileAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload
          state.error = null
        },
      )
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.error = action.payload || "Failed to update profile"
      })
  },
})

export const { logout, updateProfile } = authSlice.actions
export default authSlice.reducer
