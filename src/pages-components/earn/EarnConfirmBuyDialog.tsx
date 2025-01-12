import { AlertDialogProps } from '@radix-ui/react-alert-dialog'
import { useForm, Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { USD } from 'utils/currency'

interface EarnConfirmBuyDialogProps extends AlertDialogProps {
  coin: string
  onConfirm: (amount: number) => void
  onClose: () => void
  initialValue?: number
}

interface IFormInput {
  purchaseAmount: number
}

const EarnConfirmBuyDialog = ({ coin, open, onConfirm, onClose, initialValue }: EarnConfirmBuyDialogProps) => {
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      purchaseAmount: initialValue,
    },
  })

  const handleSave = (data: IFormInput) => {
    onConfirm(data.purchaseAmount)
    onClose()
  }

  return (
    <AlertDialog open={open}>
      <form>
        <AlertDialogContent className="flex flex-col gap-6 pt-6">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to buy {coin} coin?</AlertDialogTitle>
            <AlertDialogDescription>This purchase will be made from your Binance account</AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <Controller
              render={({ field }) => (
                <NumericFormat
                  decimalScale={2}
                  fixedDecimalScale
                  thousandSeparator
                  className="w-40 p-1 text-black rounded-sm"
                  {...field}
                />
              )}
              name="purchaseAmount"
              control={control}
            />
            <span className="ml-2">$</span>
          </div>

          <div className="flex gap-2">
            <AlertDialogAction onClick={handleSubmit(handleSave)}>Buy</AlertDialogAction>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </form>
    </AlertDialog>
  )
}

export default EarnConfirmBuyDialog
