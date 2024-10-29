export interface IBalance {
  balance: number
  is_ballance_enough: boolean
  minimum_balance: number
}

export interface IEarnBalance {
  balance: number
  is_ballance_enough: boolean
  minimum_balance: number
  suggested_coin: string
}
