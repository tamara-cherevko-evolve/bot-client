import { useMutation, useQueryClient } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosPut } from 'helpers/axiosInstance'
import { TradingInfoToUpdate } from 'interfaces/trading/interface'

const useUpdateTredingInfo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ coin, tradingInfo }: { coin: number; tradingInfo: TradingInfoToUpdate }) =>
      axiosPut(`/update-trading-info/${coin}`, tradingInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEYS.GET_TRADING_INFO] })
    },
  })
}

export default useUpdateTredingInfo
