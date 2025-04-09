import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'
import { IEarnBalance } from 'interfaces/balance/interface'

const useGetEarnBalanceWithSuggestion = () => {
  return useQuery({
    queryKey: [QUERIES_KEYS.GET_EARN_BALANCE],
    queryFn: () => axiosGet<IEarnBalance>('/earn-suggestion'),
  })
}

export default useGetEarnBalanceWithSuggestion
