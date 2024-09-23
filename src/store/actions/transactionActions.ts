// src/store/actions/transactionActions.ts

import { createAsyncThunk } from "@reduxjs/toolkit"
import { Transaction, UpdateTransaction } from "../../types/transaction"
import { PaymentProviderDependencies } from "../../context/paymentProvider.dependencies"

// Define the shape of the extra argument
interface ThunkApiConfig {
  rejectValue: string
  extra: PaymentProviderDependencies
}

// Fetch all transactions
export const fetchTransactionsAsync = createAsyncThunk<
  Transaction[],
  void,
  ThunkApiConfig
>(
  "transactions/fetchTransactionsAsync",
  async (_, { rejectWithValue, extra }) => {
    try {
      const transactions = await extra.transactions.fetchTransactions()
      return transactions
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch transactions")
    }
  },
)

// Fetch a single transaction by ID
export const fetchTransactionByIdAsync = createAsyncThunk<
  Transaction,
  number,
  ThunkApiConfig
>(
  "transactions/fetchTransactionByIdAsync",
  async (transactionId, { rejectWithValue, extra }) => {
    try {
      const transaction =
        await extra.transactions.fetchTransactionById(transactionId)
      return transaction
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch the transaction")
    }
  },
)

// Create a new transaction
export const createTransactionAsync = createAsyncThunk<
  Transaction,
  Omit<Transaction, "id">,
  ThunkApiConfig
>(
  "transactions/createTransactionAsync",
  async (newTransaction, { rejectWithValue, extra }) => {
    try {
      const transaction =
        await extra.transactions.createTransaction(newTransaction)
      return transaction
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to create the transaction",
      )
    }
  },
)

// Update an existing transaction
export const updateTransactionAsync = createAsyncThunk<
  Transaction,
  { id: number; data: Partial<Transaction> },
  ThunkApiConfig
>(
  "transactions/updateTransactionAsync",
  async ({ id, data }, { rejectWithValue, extra }) => {
    try {
      const updatedTransaction = await extra.transactions.updateTransaction(
        id,
        data,
      )
      return updatedTransaction
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to update the transaction",
      )
    }
  },
)
