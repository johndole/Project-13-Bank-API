import { FakeTransactionGateway } from "../api/FakeTransactionGateway"
import { ITransactionGateway } from "../api/ITransactionGateway"

export type PaymentProviderDependencies = {
  transactions: ITransactionGateway
}

export const paymentProviderDependencies: PaymentProviderDependencies = {
  transactions:
    process.env.NODE_ENV === "production"
      ? new TransactionGateway()
      : new FakeTransactionGateway(),
}
