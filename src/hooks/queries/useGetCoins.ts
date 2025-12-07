import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'
import { ICoin } from 'interfaces/coins/interface'

const useGetCoins = () => {
  const quary = useQuery({
    queryKey: [QUERIES_KEYS.GET_COINS],
    queryFn: () => axiosGet<ICoin[]>(`/coins`),
    throwOnError: true,
    staleTime: Infinity,
  })

  const getCoinById = (coinId: number) => {
    console.log('coinId', coinId)
    console.log('quary?.data', quary?.data)
    return quary?.data?.find((coin) => coin.id === coinId)
  }

  return { ...quary, getCoinById }
}

export default useGetCoins
