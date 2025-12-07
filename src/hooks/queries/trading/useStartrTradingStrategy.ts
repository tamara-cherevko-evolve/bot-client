import { useMutation, useQueryClient } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosPost } from 'helpers/axiosInstance'

const useStartrTradingStrategy = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ coin }: { coin: number }) => axiosPost(`/start-strategy/${coin}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEYS.GET_TRADING_INFO] })
    },
  })
}

export default useStartrTradingStrategy
