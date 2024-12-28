import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'
import QUERIES_KEYS from 'constants/queriesKeys'
import { axiosPost } from 'helpers/axiosInstance'
import useDialogOpen from 'hooks/useDialogOpen'
import { ErrorResponse } from 'interfaces/common/interface'
import { IBuyCoinResponse, Purchase } from 'interfaces/earn/interface'
import EarnConfirmBuyDialog from 'pages-components/earn/EarnConfirmBuyDialog'

const useBuyCoin = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { state: purchase, isOpen, openDialog, closeDialog } = useDialogOpen<Purchase | null>(null)

  const mutation = useMutation({
    mutationFn: (purchase: Purchase) => axiosPost<IBuyCoinResponse>(`/buy-coin`, purchase),
  })

  const buyCoin = (coin: string, purchaseAmount: number) => {
    openDialog({ coin, purchaseAmount })
  }

  const handleConfirmBuyCoin = async () => {
    closeDialog()

    if (!purchase) return

    try {
      const data = await mutation.mutateAsync(purchase)

      if (data?.status !== 'success') return

      toast({
        title: 'Success!',
        description: `You have successfully bought ${data.order.origQty} of ${purchase.coin} for ${data.order.price}!`,
        duration: 10000, //10 seconds
      })
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEYS.GET_EARN_SUMMARY] })
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEYS.GET_EARN_BALANCE] })
      queryClient.invalidateQueries({ queryKey: [[QUERIES_KEYS.GET_EARN_HISTORY, purchase]] })
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
    <EarnConfirmBuyDialog
      coin={purchase?.coin ?? ''}
      amount={purchase?.purchaseAmount ?? 0}
      open={isOpen}
      onClose={closeDialog}
      onConfirm={handleConfirmBuyCoin}
    />
  )

  return {
    purchase,
    isOpen,
    openDialog,
    closeDialog,
    buyCoin,
    ConfirmEarnBuyCoinDialog,
    ...mutation,
  }
}

export default useBuyCoin
