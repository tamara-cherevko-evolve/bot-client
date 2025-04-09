import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'
import { IEarnData } from 'interfaces/earn/interface'

const useGetEarnHistory = (coinId: number) => {
  return useQuery({
    queryKey: [QUERIES_KEYS.GET_EARN_HISTORY, coinId],
    queryFn: () => axiosGet<IEarnData[]>(`/earn-history/${coinId}`),
  })
}

export default useGetEarnHistory
