// src/store/actions/transactionActions.ts

import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../axiosConfig"
import {
  Transaction,
  TransactionState,
  UpdateTransaction,
} from "../../types/transaction"

// Base URL for transactions endpoints
const TRANSACTIONS_URL = "/transactions"

// Fetch all transactions
export const fetchTransactionsAsync = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>("transactions/fetchTransactionsAsync", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Transaction[]>(TRANSACTIONS_URL)
    return response.data
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch transactions",
    )
  }
})

// Fetch a single transaction by ID
export const fetchTransactionByIdAsync = createAsyncThunk<
  Transaction,
  number,
  { rejectValue: string }
>(
  "transactions/fetchTransactionByIdAsync",
  async (transactionId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Transaction>(
        `${TRANSACTIONS_URL}/${transactionId}`,
      )
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch the transaction",
      )
    }
  },
)

// Create a new transaction
export const createTransactionAsync = createAsyncThunk<
  Transaction,
  Omit<Transaction, "id">,
  { rejectValue: string }
>(
  "transactions/createTransactionAsync",
  async (newTransaction, { rejectWithValue }) => {
    try {
      const response = await axios.post<Transaction>(
        TRANSACTIONS_URL,
        newTransaction,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create the transaction",
      )
    }
  },
)

// Update an existing transaction
export const updateTransactionAsync = createAsyncThunk<
  Transaction,
  { id: number; data: Partial<Transaction> },
  { rejectValue: string }
>(
  "transactions/updateTransactionAsync",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put<Transaction>(
        `${TRANSACTIONS_URL}/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update the transaction",
      )
    }
  },
)
