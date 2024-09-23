// src/store/slices/transactionSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Transaction, TransactionState } from "../../types/transaction"
import {
  fetchTransactionsAsync,
  fetchTransactionByIdAsync,
  createTransactionAsync,
  updateTransactionAsync,
} from "../actions/transactionActions"

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
}

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  // Synchronous reducers

  reducers: {},

  // Asynchronous reducers
  extraReducers: builder => {
    // Fetch All Transactions
    builder
      .addCase(fetchTransactionsAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchTransactionsAsync.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.loading = false
          state.transactions = action.payload
        },
      )
      .addCase(fetchTransactionsAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch transactions"
      })

    // Fetch Transaction by ID
    builder
      .addCase(fetchTransactionByIdAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchTransactionByIdAsync.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.loading = false
          const index = state.transactions.findIndex(
            t => t.id === action.payload.id,
          )
          if (index !== -1) {
            state.transactions[index] = action.payload
          } else {
            state.transactions.push(action.payload)
          }
        },
      )
      .addCase(fetchTransactionByIdAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch the transaction"
      })

    // Create Transaction
    builder
      .addCase(createTransactionAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        createTransactionAsync.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.loading = false
          state.transactions.push(action.payload)
        },
      )
      .addCase(createTransactionAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to create the transaction"
      })

    // Update Transaction
    builder
      .addCase(updateTransactionAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        updateTransactionAsync.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.loading = false
          const index = state.transactions.findIndex(
            t => t.id === action.payload.id,
          )
          if (index !== -1) {
            state.transactions[index] = action.payload
          }
        },
      )
      .addCase(updateTransactionAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to update the transaction"
      })
  },
})

// Export the reducer to be included in the store
export default transactionSlice.reducer
