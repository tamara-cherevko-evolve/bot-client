import { DialogProps } from '@radix-ui/react-dialog'
import { useForm, Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface IFormInput {
  purchaseAmount: number
}

interface EarnUpdateBidDialogProps extends DialogProps {
  initialValue?: number
  onSubmit: (amount: number) => void
}

const EarnUpdateBidDialog = ({ onOpenChange, initialValue, onSubmit, ...props }: EarnUpdateBidDialogProps) => {
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      purchaseAmount: initialValue,
    },
  })

  const handleSave = (data: IFormInput) => {
    onSubmit(data.purchaseAmount)
    onOpenChange && onOpenChange(false)
  }

  return (
    <Dialog {...props} onOpenChange={onOpenChange}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update suggested purchase amount:</DialogTitle>
          <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-6 pt-6">
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

            <div>
              <Button type="submit" size="sm">
                Save
              </Button>
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="ml-2"
                onClick={() => onOpenChange && onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EarnUpdateBidDialog
