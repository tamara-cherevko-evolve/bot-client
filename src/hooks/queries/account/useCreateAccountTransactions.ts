import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'
import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosPost } from 'helpers/axiosInstance'
import { AccountTransaction, AccountTransactionType } from 'interfaces/account/interface'
import { ErrorResponse } from 'interfaces/common/interface'

interface CreateAccountTransactionPayload {
  type: AccountTransactionType
  description: string
  amount: string
  date: string
}

const useCreateAccountTransactions = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (payload: CreateAccountTransactionPayload) => {
      return axiosPost<AccountTransaction>(`/account-transactions`, {
        transaction_type: payload.type,
        description: payload.description,
        amount: Number.parseFloat(payload.amount.replace(/,/g, '')),
        transaction_date: new Date(payload.date),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEYS.GET_ACCOUNT_TRANSACTIONS] })
      toast({
        title: 'Success!',
        description: 'Transaction created successfully',
        duration: 5000,
      })
    },
    onError: (error: ErrorResponse) => {
      toast({
        title: 'Oops... ERROR!',
        description: error?.response?.data?.message || 'Failed to create transaction',
        variant: 'destructive',
        duration: 60000,
      })
    },
  })

  return mutation
}

export default useCreateAccountTransactions
