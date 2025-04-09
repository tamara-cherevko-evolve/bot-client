import currency from 'currency.js'

export const USD = (value: number, fixed = 2) => currency(value, { symbol: '$', precision: fixed }).format()
