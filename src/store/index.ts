import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import transactionReducer from "./slices/transactionSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
