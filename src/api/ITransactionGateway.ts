import { Transaction } from "../types/transaction"

export interface ITransactionGateway {
  fetchTransactions(): Promise<Transaction[]>
  fetchTransactionById(id: number): Promise<Transaction>
  createTransaction(transaction: Omit<Transaction, "id">): Promise<Transaction>
  updateTransaction(
    id: number,
    data: Partial<Transaction>,
  ): Promise<Transaction>
}
