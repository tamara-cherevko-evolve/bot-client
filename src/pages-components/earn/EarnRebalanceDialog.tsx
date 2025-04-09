import { DialogProps } from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ICoin } from 'interfaces/coins/interface'
import { IEarnCoinSummary } from 'interfaces/earn/interface'
import { WithLoading } from 'shared-components'

interface IFormInput {
  rebalanceAmount: number
}

interface EarnRebalaceDialogProps extends DialogProps {
  coin: IEarnCoinSummary & ICoin
  onSubmit: (amount: number) => void
  closeDialog?: () => void
  isLoading: boolean
  error?: string
}

const EarnRebalanceDialog = ({ coin, isLoading, error, onSubmit, closeDialog, ...props }: EarnRebalaceDialogProps) => {
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      rebalanceAmount: coin.amount,
    },
  })

  const handleSave = (data: IFormInput) => {
    onSubmit(data.rebalanceAmount)
  }

  if (!coin) return null

  return (
    <WithLoading isLoading={isLoading}>
      <Dialog {...props} onOpenChange={closeDialog}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Rebalance {coin.name}</DialogTitle>
            <DialogDescription>
              Enter the amount of coin which was left after rebalance. This amoun will save with current earn price.
            </DialogDescription>
            <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-6 pt-6">
              <Controller
                render={({ field }) => (
                  <NumericFormat
                    decimalScale={coin.amount_round_to}
                    fixedDecimalScale
                    thousandSeparator
                    className="w-40 p-1 text-black rounded-sm"
                    {...field}
                  />
                )}
                name="rebalanceAmount"
                control={control}
              />
              {!!error && <Alert variant="destructive">{error}</Alert>}
              <div></div>
              <div>
                <Button type="submit" size="sm">
                  Save
                </Button>
                <Button type="submit" size="sm" variant="ghost" className="ml-2" onClick={closeDialog}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </WithLoading>
  )
}

export default EarnRebalanceDialog
