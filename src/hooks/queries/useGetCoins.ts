import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'
import { ICoin } from 'interfaces/coins/interface'

const useGetCoins = () => {
  const { data, isPending, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERIES_KEYS.GET_COINS],
    queryFn: () => axiosGet<ICoin[]>(`/coins`),
    throwOnError: true,
    staleTime: Infinity,
  })

  const getCoinById = (coinId: number) => {
    return data?.find((coin) => coin.id === coinId)
  }

  return { data, isPending, isLoading, isError, error, refetch, getCoinById }
}

export default useGetCoins
