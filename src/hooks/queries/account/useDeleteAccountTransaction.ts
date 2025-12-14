import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'
import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosDelete } from 'helpers/axiosInstance'
import { ErrorResponse } from 'interfaces/common/interface'

const useDeleteAccountTransaction = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (transactionId: number) => axiosDelete(`/account-transactions/${transactionId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEYS.GET_ACCOUNT_TRANSACTIONS] })
      toast({
        title: 'Success!',
        description: 'Transaction deleted successfully',
        duration: 5000,
      })
    },
    onError: (error: ErrorResponse) => {
      toast({
        title: 'Oops... ERROR!',
        description: error?.response?.data?.message || 'Failed to delete transaction',
        variant: 'destructive',
        duration: 60000,
      })
    },
  })

  return mutation
}

export default useDeleteAccountTransaction
