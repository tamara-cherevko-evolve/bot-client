import { IOrder } from 'interfaces/orders/interface'

export interface IEarnData {
  id: number
  date: string
  amount: number
  price: number
  total: number
  commission: number
}

export interface IEarnSummary {
  coin: string
  amount: number
  spent: number
  diff_in_dollars: number
  diff_in_percent: number
  current_price: number
  avg_price: number
}

export interface IBuyCoinResponse {
  status: string
  order: IOrder
}
