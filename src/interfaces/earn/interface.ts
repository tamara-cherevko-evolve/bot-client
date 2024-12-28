import { IOrder } from 'interfaces/orders/interface'

export interface IEarnData {
  id: number
  date: Date
  amount: number
  price: number
  total: number
  commission: number
}

export interface IEarnSummary {
  coin: string
  coin_id: number
  amount: number
  spent: number
  diff_in_dollars: number
  diff_in_percentage: number
  current_price: number
  avg_price: number
  last_investment: Date
}

export interface IBuyCoinResponse {
  status: string
  order: IOrder
}

export interface Purchase {
  coin: string
  purchaseAmount: number
}

export interface RebalanceQuery {
  coin: string
  amount: number | null
}
