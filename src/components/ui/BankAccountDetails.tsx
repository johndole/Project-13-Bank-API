import React from "react"
import "../../css/bankAccountDetails.css"

interface BankAccountDetailsProps {
  accountTitle: string
  accountAmount: number
  accountAmountDesciption: string
  onClick?: () => void
}

// Utility function to format numbers with commas
const formatNumberWithCommas = (number: number) => {
  return new Intl.NumberFormat("en-US").format(number)
}

const BankAccountDetails = ({
  accountTitle,
  accountAmount,
  accountAmountDesciption,
  onClick,
}: BankAccountDetailsProps) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{accountTitle}</h3>
        <p className="account-amount">
          ${formatNumberWithCommas(accountAmount)}
        </p>
        <p className="account-amount-description">{accountAmountDesciption}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button" onClick={onClick}>
          View transactions
        </button>
      </div>
    </section>
  )
}

export default BankAccountDetails
