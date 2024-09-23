// src/store/store.ts

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import transactionReducer from "./slices/transactionSlice"
import {
  PaymentProviderDependencies,
  paymentProviderDependencies,
} from "../context/paymentProvider.dependencies"

const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: paymentProviderDependencies, // Inject dependencies here
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Custom Thunk type that includes the dependencies
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  PaymentProviderDependencies,
  Action<string>
>

export default store
