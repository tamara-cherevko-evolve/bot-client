export enum AccountTransactionType {
  Debit = 'debit',
  Credit = 'credit',
}

export interface AccountTransaction {
  id: number
  transaction_date: Date
  transaction_type: AccountTransactionType
  description: string
  amount: number
  balance: number
}
