import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'
import { ICoin } from 'interfaces/coins/interface'

const useGetCoins = () => {
  return useQuery({
    queryKey: [QUERIES_KEYS.GET_COINS],
    queryFn: () => axiosGet<ICoin[]>(`/coins`),
    throwOnError: true,
    staleTime: Infinity,
  })
}

export default useGetCoins
