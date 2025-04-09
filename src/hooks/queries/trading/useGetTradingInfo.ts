import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'
import { TradingInfo } from 'interfaces/trading/interface'

const useGetTradingInfo = (coinId: number) => {
  return useQuery({
    queryKey: [QUERIES_KEYS.GET_TRADING_INFO, coinId],
    queryFn: () => axiosGet<TradingInfo>(`/trading-info/${coinId}`),
  })
}

export default useGetTradingInfo
