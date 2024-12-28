import Big from 'big.js'

import { ICoin } from 'interfaces/coins/interface'

import { USD } from './currency'

export const getCoinPrice = (price: number, coin: ICoin) => {
  return price ? Big(price).toFixed(coin.price_round_to) : '-'
}

export const getDiffInDollars = (diff_in_dollars: number) => {
  return diff_in_dollars ? USD(diff_in_dollars) : '-'
}

export const getDiffInPercentage = (diff_in_percentage: number) => {
  return diff_in_percentage ? Big(diff_in_percentage).toFixed(2) + '%' : '-'
}

export const getCoinSpent = (spent: number) => {
  return spent ? USD(spent) : '-'
}

export const getCoinAmount = (amount: number, coin: ICoin) => {
  return amount ? `${Big(amount).toFixed(coin.amount_round_to)} ${coin.name}` : '-'
}
