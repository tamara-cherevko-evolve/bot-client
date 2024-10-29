import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'
import { IEarnSummary } from 'interfaces/earn/interface'

const useGetEarnSummary = () => {
  return useQuery({
    queryKey: [QUERIES_KEYS.GET_EARN_SUMMARY],
    queryFn: () => axiosGet<IEarnSummary>('/get-earn-summary'),
    throwOnError: true,
  })
}

export default useGetEarnSummary
