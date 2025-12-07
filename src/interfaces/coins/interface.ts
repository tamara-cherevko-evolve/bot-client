export interface ICoin {
  id: number
  name: string
  title: string
  priority: string
  amount_round_to: number
  price_round_to: number
  is_preferred?: boolean
}
