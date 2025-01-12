import { ICoin } from 'interfaces/coins/interface'
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
  balance: number
  suggested_coin_id: number
  suggested_bid: number
  summary: (IEarnCoinSummary & ICoin)[]
}

export interface IEarnCoinSummary {
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
  coin: string
  amount: number
  price: number
}

export interface Purchase {
  coin: string
  purchaseAmount: number
}

export interface RebalanceQuery {
  coin: string
  amount: number | null
}
