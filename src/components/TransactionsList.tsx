// src/components/TransactionsList.tsx

import React from "react"
import { useTransactions } from "../store/hooks/useTransaction"

const TransactionsList: React.FC = () => {
  const { transactions, loading, error, totalAmount } = useTransactions()

  if (loading) return <p>Loading transactions...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id} style={{ marginBottom: "10px" }}>
            <strong>{transaction.description}</strong>: $
            {transaction.amount.toFixed(2)} on {transaction.date}
            {/* <button
              onClick={() => updateCategoryFood(transaction.)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button> */}
          </li>
        ))}
      </ul>
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
    </div>
  )
}

export default TransactionsList
