import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'
import { IBalance } from 'interfaces/balance/interface'

const useGetBalance = () => {
  return useQuery({
    queryKey: [QUERIES_KEYS.GET_BALANCE],
    queryFn: () => axiosGet<IBalance>('/get-balance'),
  })
}

export default useGetBalance
