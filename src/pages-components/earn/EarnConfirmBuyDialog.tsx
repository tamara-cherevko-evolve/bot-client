import { AlertDialogProps } from '@radix-ui/react-alert-dialog'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { USD } from 'utils/currency'

interface EarnConfirmBuyDialogProps extends AlertDialogProps {
  coin: string
  amount: number
  onConfirm: () => void
  onClose: () => void
}

const EarnConfirmBuyDialog = ({ coin, open, amount, onConfirm, onClose }: EarnConfirmBuyDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to buy {coin} for {USD(amount)}?
          </AlertDialogTitle>
          <AlertDialogDescription>This purchase will be made from your Binance account</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EarnConfirmBuyDialog
