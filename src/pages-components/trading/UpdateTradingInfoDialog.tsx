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
import useGetCoins from 'hooks/queries/useGetCoins'
import { TradingInfoToUpdate } from 'interfaces/trading/interface'

interface UpdateTradingInfoDialogProps extends AlertDialogProps {
  coinId: number
  onConfirm: (data: TradingInfoToUpdate) => void
  onClose: () => void
  defaultValues?: TradingInfoToUpdate
}

const UpdateTradingInfoDialog = ({ coinId, open, onConfirm, onClose, defaultValues }: UpdateTradingInfoDialogProps) => {
  const { isLoading: isCoinsLoading, getCoinById } = useGetCoins()
  const coin = getCoinById(coinId)

  const { control, handleSubmit } = useForm<TradingInfoToUpdate>({
    defaultValues,
  })

  const handleSave = (data: TradingInfoToUpdate) => {
    onConfirm(data)
    onClose()
  }

  return (
    <AlertDialog open={open}>
      <form>
        {isCoinsLoading && (
          <AlertDialogContent className="flex flex-col gap-6 pt-6 h-60 items-center justify-center">
            Loading...
          </AlertDialogContent>
        )}
        {!!coin && (
          <AlertDialogContent className="flex flex-col gap-6 pt-6">
            <AlertDialogHeader>
              <AlertDialogTitle>Update trading info for {coin?.name} coin</AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-2 items-center">
              <label className="text-sm font-medium text-gray-300">Quantity:</label>
              <Controller
                render={({ field }) => (
                  <NumericFormat
                    decimalScale={coin?.amount_round_to}
                    fixedDecimalScale
                    thousandSeparator
                    className="w-40 p-1 text-black rounded-sm"
                    {...field}
                  />
                )}
                name="quantity"
                control={control}
              />
              <span className="ml-2">{coin?.name}</span>
            </div>
            <div className="flex gap-2 items-center">
              <label className="text-sm font-medium text-gray-300">Max percent down:</label>
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
                name="max_percent_down"
                control={control}
              />
              <span className="ml-2">%</span>
            </div>

            <div className="flex gap-2">
              <AlertDialogAction onClick={handleSubmit(handleSave)}>Update</AlertDialogAction>
              <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            </div>
          </AlertDialogContent>
        )}
      </form>
    </AlertDialog>
  )
}

export default UpdateTradingInfoDialog
