import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'
import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosPost } from 'helpers/axiosInstance'
import useDialogOpen from 'hooks/useDialogOpen'
import { ErrorResponse } from 'interfaces/common/interface'
import { IBuyCoinResponse } from 'interfaces/earn/interface'
import EarnConfirmBuyDialog from 'pages-components/earn/EarnConfirmBuyDialog'

const useBuyCoin = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { state: coinToBuy, isOpen, openDialog, closeDialog } = useDialogOpen<string | null>(null)

  const mutation = useMutation({
    mutationFn: (coin: string) => axiosPost<IBuyCoinResponse>(`/buy-coin`, { coin }),
  })

  const buyCoin = (coin: string) => {
    openDialog(coin)
  }

  const handleConfirmBuyCoin = async () => {
    closeDialog()

    if (!coinToBuy) return

    try {
      const data = await mutation.mutateAsync(coinToBuy)

      if (data?.status !== 'success') return

      toast({
        title: 'Success!',
        description: `You have successfully bought ${data.order.origQty} of ${coinToBuy} for ${data.order.price}!`,
        duration: 10000, //10 seconds
      })
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEYS.GET_EARN_SUMMARY] })
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEYS.GET_EARN_BALANCE] })
      queryClient.invalidateQueries({ queryKey: [[QUERIES_KEYS.GET_EARN_DATA, coinToBuy]] })
    } catch (error) {
      toast({
        title: 'Oops... ERROR!',
        description: (error as ErrorResponse)?.response?.data?.message,
        variant: 'destructive',
        duration: 60000, // 1 minute
      })
    }
  }

  const ConfirmEarnBuyCoinDialog = () => (
    <EarnConfirmBuyDialog coin={coinToBuy ?? ''} open={isOpen} onClose={closeDialog} onConfirm={handleConfirmBuyCoin} />
  )

  return {
    coinToBuy,
    isOpen,
    openDialog,
    closeDialog,
    buyCoin,
    ConfirmEarnBuyCoinDialog,
    ...mutation,
  }
}

export default useBuyCoin
