// src/store/hooks/useTransactions.ts

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../index"
import {
  fetchTransactionsAsync,
  fetchTransactionByIdAsync,
  createTransactionAsync,
  updateTransactionAsync,
} from "../actions/transactionActions"
import { Transaction } from "../../types/transaction"
import { useEffect } from "react"

export const useTransactions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transaction,
  )

  useEffect(() => {
    dispatch(fetchTransactionsAsync())
  }, [dispatch])

  const fetchTransactionById = (id: number) => {
    dispatch(fetchTransactionByIdAsync(id))
  }

  const createTransaction = (transaction: Omit<Transaction, "id">) => {
    dispatch(createTransactionAsync(transaction))
  }

  const updateTransaction = (id: number, data: Partial<Transaction>) => {
    dispatch(updateTransactionAsync({ id, data }))
  }

  // Calculate total amount for a specific account
  const getBalanceForAccount = (accountId: number): number => {
    const accountTransactions = transactions.filter(
      t => t.accountId === accountId,
    )
    const balance = accountTransactions.reduce((sum, t) => sum + t.amount, 0)
    return balance
  }

  return {
    transactions,
    loading,
    error,
    fetchTransactionById,
    createTransaction,
    updateTransaction,
    getBalanceForAccount,
  }
}
