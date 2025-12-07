import { ICoin } from 'interfaces/coins/interface'

export enum EarnDirection {
  BUY = 'buy',
  SELL = 'sell',
}

export interface IEarnData {
  id: number
  date: Date
  amount: number
  price: number
  total: number
  commission: number
  direction: EarnDirection
}

export interface ISuggestedSell {
  id: number
  name: string
  profit_percentage: number
  profit_dollars: number
  current_value: number
  amount: number
}

export interface IAllocation {
  preferred_spent: number
  secondary_spent: number
  secondary_percentage: number
  target_secondary_percentage: number
}

export interface IEarnSummary {
  balance: number
  suggested_coin_id: number
  suggested_buy: number
  suggested_sell: ISuggestedSell[]
  allocation: IAllocation
  summary: (IEarnCoinSummary & ICoin)[]
}

export interface IEarnCoinSummary {
  name: string
  id: number
  amount: number
  spent: number
  diff_in_dollars: number
  diff_in_percentage: number
  current_price: number
  avg_price: number
  holdings_percentage?: number
}

export interface IBuyCoinResponse {
  coin: string
  amount: number
  price: number
  quantity: number
}

export interface Purchase {
  coin: string
  purchaseAmount: number
}

export interface RebalanceQuery {
  coin: string
  amount: number | null
}
