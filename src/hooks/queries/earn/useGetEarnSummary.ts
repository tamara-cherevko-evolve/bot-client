import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'
import { ICoin } from 'interfaces/coins/interface'
import { IEarnSummary } from 'interfaces/earn/interface'

import useGetCoins from '../useGetCoins'

const useGetEarnSummary = () => {
  const { data: coinsList } = useGetCoins()

  return useQuery({
    queryKey: [QUERIES_KEYS.GET_EARN_SUMMARY],
    queryFn: () => axiosGet<(IEarnSummary & ICoin)[]>('/earn-summary'),
    throwOnError: true,
    enabled: !!coinsList?.length,
  })
}

export default useGetEarnSummary
