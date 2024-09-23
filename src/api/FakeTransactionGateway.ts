// src/api/FakeTransactionAPI.ts

import { ITransactionGateway } from "./ITransactionGateway"
import { Transaction } from "../types/transaction"

export class FakeTransactionGateway implements ITransactionGateway {
  private transactions: Transaction[] = [
    {
      id: 1,
      accountId: 1,
      description: "Groceries",
      amount: 50.25,
      date: "2024-04-01",
    },
    {
      id: 2,
      accountId: 1,
      description: "Electricity Bill",
      amount: 75.0,
      date: "2024-04-03",
    },
    {
      id: 3,
      accountId: 2,
      description: "Internet Subscription",
      amount: 45.99,
      date: "2024-04-05",
    },
    {
      id: 4,
      accountId: 3,
      description: "Gym Membership",
      amount: 30.0,
      date: "2024-04-07",
    },
    {
      id: 5,
      accountId: 2,
      description: "Coffee",
      amount: 4.5,
      date: "2024-04-09",
    },
    {
      id: 6,
      accountId: 3,
      description: "Book Purchase",
      amount: 15.75,
      date: "2024-04-11",
    },
    {
      id: 7,
      accountId: 1,
      description: "Movie Tickets",
      amount: 25.0,
      date: "2024-04-13",
    },
    {
      id: 8,
      accountId: 2,
      description: "Gas",
      amount: 40.0,
      date: "2024-04-15",
    },
    {
      id: 9,
      accountId: 3,
      description: "Restaurant",
      amount: 60.0,
      date: "2024-04-17",
    },
    {
      id: 10,
      accountId: 1,
      description: "Online Course",
      amount: 120.0,
      date: "2024-04-19",
    },
  ]

  private nextId: number = 11

  async fetchTransactions(): Promise<Transaction[]> {
    // Simulate network delay
    await this.simulateDelay(500)
    return [...this.transactions]
  }

  async fetchTransactionById(id: number): Promise<Transaction> {
    await this.simulateDelay(300)
    const transaction = this.transactions.find(t => t.id === id)
    if (!transaction) {
      throw new Error("Transaction not found")
    }
    return { ...transaction }
  }

  async createTransaction(
    transaction: Omit<Transaction, "id">,
  ): Promise<Transaction> {
    await this.simulateDelay(300)
    const newTransaction: Transaction = { id: this.nextId++, ...transaction }
    this.transactions.push(newTransaction)
    return { ...newTransaction }
  }

  async updateTransaction(
    id: number,
    data: Partial<Transaction>,
  ): Promise<Transaction> {
    await this.simulateDelay(300)
    const index = this.transactions.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error("Transaction not found")
    }
    this.transactions[index] = { ...this.transactions[index], ...data }
    return { ...this.transactions[index] }
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
