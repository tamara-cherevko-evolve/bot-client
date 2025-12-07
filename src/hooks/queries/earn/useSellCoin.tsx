import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'
import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosPost } from 'helpers/axiosInstance'
import useDialogOpen from 'hooks/useDialogOpen'
import { ICoin } from 'interfaces/coins/interface'
import { ErrorResponse } from 'interfaces/common/interface'
import { IBuyCoinResponse } from 'interfaces/earn/interface'
import EarnConfirmSellDialog from 'pages-components/earn/EarnConfirmSellDialog'

interface SellCoinState {
  coin: string
  maxQuantity: number
  decimalScale: number
}

const useSellCoin = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { state: sale, isOpen, openDialog, closeDialog } = useDialogOpen<SellCoinState | null>(null)

  const mutation = useMutation({
    mutationFn: (params: { coin: string; quantity: number }) =>
      axiosPost<IBuyCoinResponse>(`/coins/sell/${params.coin}`, {
        quantity: params.quantity,
      }),
  })

  const sellCoin = (coin: ICoin & { amount?: number }, maxQuantity?: number) => {
    openDialog({
      coin: coin.name,
      maxQuantity: maxQuantity ?? coin.amount ?? 0,
      decimalScale: coin.amount_round_to ?? 4,
    })
  }

  const handleConfirmSellCoin = async (quantity: number) => {
    closeDialog()

    if (!sale) throw new Error('Sale is not defined')

    try {
      const data = await mutation.mutateAsync({
        coin: sale.coin,
        quantity,
      })

      if (!data) throw new Error('Something went wrong')

      toast({
        title: 'Success!',
        description: `You have successfully sold ${data.quantity} ${sale.coin} at $${data.price} for total $${data.amount}!`,
        duration: 10000,
      })
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEYS.GET_EARN_SUMMARY] })
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEYS.GET_EARN_BALANCE] })
      queryClient.invalidateQueries({ queryKey: [[QUERIES_KEYS.GET_EARN_HISTORY, sale.coin]] })
    } catch (error) {
      toast({
        title: 'Oops... ERROR!',
        description: (error as ErrorResponse)?.response?.data?.message,
        variant: 'destructive',
        duration: 60000,
      })
    }
  }

  const ConfirmEarnSellCoinDialog = () => (
    <EarnConfirmSellDialog
      coin={sale?.coin ?? ''}
      open={isOpen}
      onClose={closeDialog}
      onConfirm={handleConfirmSellCoin}
      maxQuantity={sale?.maxQuantity ?? 0}
      decimalScale={sale?.decimalScale ?? 4}
    />
  )

  return {
    sale,
    isOpen,
    openDialog,
    closeDialog,
    sellCoin,
    ConfirmEarnSellCoinDialog,
    ...mutation,
  }
}

export default useSellCoin
