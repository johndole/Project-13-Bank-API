export interface Transaction {
  id: number
  accountId: number // Links to an Account
  description: string
  amount: number
  date: string // ISO format (e.g., "2024-04-01")
  notes?: string
  category?: [string]
}

export interface UpdateTransaction {
  id: number
  notes: string
  category: [string]
}

export interface TransactionState {
  transactions: Transaction[]
  loading: boolean
  error: string | null
}
