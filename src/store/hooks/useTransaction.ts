// src/hooks/useTransactions.ts

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../index"
import {
  fetchTransactionsAsync,
  fetchTransactionByIdAsync,
  createTransactionAsync,
  updateTransactionAsync,
} from "../actions/transactionActions"
import { Transaction, UpdateTransaction } from "../../types/transaction"
import { useEffect } from "react"

export const useTransactions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transaction,
  )

  // Fetch all transactions on mount
  useEffect(() => {
    dispatch(fetchTransactionsAsync())
  }, [dispatch])

  // Fetch a single transaction by ID
  const fetchTransactionById = (id: number) => {
    dispatch(fetchTransactionByIdAsync(id))
  }

  // Create a new transaction
  const createTransaction = (transaction: Omit<Transaction, "id">) => {
    dispatch(createTransactionAsync(transaction))
  }

  // Update an existing transaction
  const updateTransaction = (id: number, data: Partial<Transaction>) => {
    dispatch(updateTransactionAsync({ id, data }))
  }

  // Calculate total amount of all transactions
  const totalAmount = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  )

  return {
    transactions,
    loading,
    error,
    fetchTransactionById,
    createTransaction,
    updateTransaction,

    totalAmount,
  }
}
