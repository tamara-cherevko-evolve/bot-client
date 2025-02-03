import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'

const useGetBalance = () => {
  return useQuery({
    queryKey: [QUERIES_KEYS.GET_BALANCE],
    queryFn: () => axiosGet<number>('/balance'),
  })
}

export default useGetBalance
