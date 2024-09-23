// src/context/ApiContext.tsx

import React, { createContext, useContext } from "react"
import {
  paymentProviderDependencies,
  PaymentProviderDependencies,
} from "./paymentProvider.dependencies"

const PaymentContext = createContext<PaymentProviderDependencies>(
  paymentProviderDependencies,
)

interface PaymentProviderProps {
  children: React.ReactNode
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
}) => {
  return (
    <PaymentContext.Provider value={paymentProviderDependencies}>
      {children}
    </PaymentContext.Provider>
  )
}

export const usePaymentProvider = () => {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider")
  }
  return context
}
