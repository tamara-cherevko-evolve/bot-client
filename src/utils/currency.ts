import currency from 'currency.js'

export const USD = (value: number, fixed = 2) => currency(value, { symbol: '$', precision: fixed }).format()

export const EUR = (value: number, fixed = 2) => currency(value, { symbol: '€', precision: fixed }).format()

export const UAH = (value: number, fixed = 2) => `${currency(value, { symbol: '', precision: fixed }).format()} грн.`
