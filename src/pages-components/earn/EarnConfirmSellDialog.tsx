import { AlertDialogProps } from '@radix-ui/react-alert-dialog'
import { Controller, useForm } from 'react-hook-form'
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

interface EarnConfirmSellDialogProps extends AlertDialogProps {
  coin: string
  onConfirm: (quantity: number) => void
  onClose: () => void
  maxQuantity: number
  decimalScale?: number
}

interface IFormInput {
  quantity: number
}

const EarnConfirmSellDialog = ({
  coin,
  open,
  onConfirm,
  onClose,
  maxQuantity,
  decimalScale = 4,
}: EarnConfirmSellDialogProps) => {
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      quantity: maxQuantity,
    },
  })

  const handleSave = (data: IFormInput) => {
    onConfirm(data.quantity)
    onClose()
  }

  return (
    <AlertDialog open={open}>
      <form>
        <AlertDialogContent className="flex flex-col gap-6 pt-6">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to sell {coin}?</AlertDialogTitle>
            <AlertDialogDescription>This sale will be made from your Binance account</AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Quantity to sell:</label>
            <div className="flex items-center gap-2">
              <Controller
                render={({ field }) => (
                  <NumericFormat
                    decimalScale={decimalScale}
                    fixedDecimalScale
                    thousandSeparator
                    className="w-40 p-1 text-black rounded-sm"
                    {...field}
                  />
                )}
                name="quantity"
                control={control}
              />
              <span>{coin}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Max: {maxQuantity}</p>
          </div>

          <div className="flex gap-4">
            <AlertDialogAction
              className="w-16 bg-rose-500 hover:bg-rose-700 text-white"
              onClick={handleSubmit(handleSave)}
            >
              Sell
            </AlertDialogAction>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </form>
    </AlertDialog>
  )
}

export default EarnConfirmSellDialog
