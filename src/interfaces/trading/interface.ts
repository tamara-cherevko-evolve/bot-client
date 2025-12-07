import { ICoin } from 'interfaces/coins/interface'

export enum TradingOrderStatus {
  OPEN = 'open',
  FILLED = 'filled',
}

export interface TradingInfo {
  quantity: number
  max_percent_down: number
  coin: ICoin
  estimated_investment: number
}

export interface TradingInfoToUpdate {
  quantity: number
  max_percent_down: number
}

export interface TradingOrder {
  id: number
  coin: ICoin
  quantity: number
  price: number
  tolal: number
  transaction_time: Date
  commission: number
  status: TradingOrderStatus
}
