import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'
import { TradingOrder } from 'interfaces/trading/interface'

const useGetTradingOrders = (coinId: number) => {
  return useQuery({
    queryKey: [QUERIES_KEYS.GET_TRADING_ORDERS, coinId],
    queryFn: () => axiosGet<{ filled: TradingOrder[]; open: TradingOrder[] }>(`/trading-orders/${coinId}`),
  })
}

export default useGetTradingOrders
