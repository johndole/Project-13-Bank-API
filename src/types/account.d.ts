export interface Account {
  id: number
  title: string
  balance: number
  description: string
}

export interface AccountState {
  accounts: Account[]
  loading: boolean
  error: string | null
}
