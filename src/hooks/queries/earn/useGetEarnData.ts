import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'
import { IEarnData } from 'interfaces/earn/interface'

const useGetEarnData = (coin: string) => {
  return useQuery({
    queryKey: [QUERIES_KEYS.GET_EARN_DATA, coin],
    queryFn: () => axiosGet<IEarnData[]>(`/get-earn-data/${coin}`),
  })
}

export default useGetEarnData
