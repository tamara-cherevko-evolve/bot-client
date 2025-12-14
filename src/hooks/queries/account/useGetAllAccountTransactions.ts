import { useQuery } from '@tanstack/react-query'

import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosGet } from 'helpers/axiosInstance'
import { AccountTransaction } from 'interfaces/account/interface'

const useGetAllAccountTransactions = () => {
  const { data, isPending, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERIES_KEYS.GET_ACCOUNT_TRANSACTIONS],
    queryFn: async () => {
      const transactions = await axiosGet<AccountTransaction[]>(`/account-transactions`)
      if (!transactions) return []
      return transactions.map((transaction) => ({
        ...transaction,
        transaction_date: new Date(transaction.transaction_date),
      }))
    },
    throwOnError: true,
  })

  return { data, isPending, isLoading, isError, error, refetch }
}

export default useGetAllAccountTransactions
