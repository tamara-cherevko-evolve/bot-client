import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'
import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosPost } from 'helpers/axiosInstance'
import useDialogOpen from 'hooks/useDialogOpen'
import { RebalanceQuery } from 'interfaces/earn/interface'

import useGetCoins from '../useGetCoins'

const useRebalanceCoin = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { data: coins } = useGetCoins()
  const { state: rebalance, isOpen, openDialog, closeDialog } = useDialogOpen<RebalanceQuery | null>(null)

  const mutation = useMutation({
    mutationFn: (rebalanceQuery: RebalanceQuery) => axiosPost<any>(`/rebalance-coin`, rebalanceQuery),
  })

  const currentCoin = !!coins?.length && rebalance?.coin ? coins.find((coin) => coin.name === rebalance.coin) : null

  const startRebalanceCoin = (coin: string) => {
    openDialog({ coin, amount: null })
  }

  const saveRebalanceCoin = async (amount: number) => {
    if (!rebalance) return
    try {
      const data = await mutation.mutateAsync({ ...rebalance, amount })
      if (data?.status !== 'success') return
      toast({
        title: 'Success!',
        description: `You have successfully rebelanced ${rebalance.coin}!`,
        duration: 10000, //10 seconds
      })
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEYS.GET_EARN_SUMMARY] })
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEYS.GET_EARN_BALANCE] })
    } catch (error) {}
  }

  return {
    rebalanceCoin: currentCoin,
    startRebalanceCoin,
    saveRebalanceCoin,
    isOpen,
    closeDialog,
    ...mutation,
  }
}

export default useRebalanceCoin
