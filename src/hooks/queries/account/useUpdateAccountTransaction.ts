import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'
import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosPut } from 'helpers/axiosInstance'
import { AccountTransaction, AccountTransactionType } from 'interfaces/account/interface'
import { ErrorResponse } from 'interfaces/common/interface'

interface UpdateAccountTransactionPayload {
  id: number
  type: AccountTransactionType
  description: string
  amount: string
  date: string
}

const useUpdateAccountTransaction = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (payload: UpdateAccountTransactionPayload) => {
      return axiosPut<AccountTransaction>(`/account-transactions/${payload.id}`, {
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
        description: 'Transaction updated successfully',
        duration: 5000,
      })
    },
    onError: (error: ErrorResponse) => {
      toast({
        title: 'Oops... ERROR!',
        description: error?.response?.data?.message || 'Failed to update transaction',
        variant: 'destructive',
        duration: 60000,
      })
    },
  })

  return mutation
}

export default useUpdateAccountTransaction
