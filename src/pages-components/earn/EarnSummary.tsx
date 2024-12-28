import { format, isToday, isValid, isYesterday, max } from 'date-fns'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import useDialogOpen from 'hooks/useDialogOpen'
import { IEarnBalance } from 'interfaces/balance/interface'
import { ICoin } from 'interfaces/coins/interface'
import { IEarnSummary } from 'interfaces/earn/interface'
import { cn } from 'utils/cn'
import { USD } from 'utils/currency'
import { formatDate } from 'utils/date'

import EarnUpdateBidDialog from './EarnUpdateBidDialog'

interface EarnSummaryProps {
  balanceData: IEarnBalance
  earnSummary: (IEarnSummary & ICoin)[]
  isLoading: boolean
  purchaseAmount: number
  isPurchaseAmountCustom: boolean
  onBuyCoin: (coin: string) => void
  onPurchaseAmountChange: (amount: number | null) => void
}
const EarnSummary = ({
  balanceData,
  earnSummary,
  isLoading,
  purchaseAmount,
  isPurchaseAmountCustom,
  onBuyCoin,
  onPurchaseAmountChange,
}: EarnSummaryProps) => {
  const { isOpen, closeDialog, openDialog } = useDialogOpen()

  const coins = earnSummary || []
  const lastInvestment = max(coins.map((coin) => new Date(coin.last_investment)))
  const formattedLastInvestment = isValid(lastInvestment) ? formatDate(lastInvestment) : ''
  const isLastInvestmentToday = isValid(lastInvestment) && isToday(lastInvestment) ? ' (Today)' : ''
  const isLastInvestmentYesterday = isValid(lastInvestment) && isYesterday(lastInvestment) ? ' (Yesterday)' : ''
  const lastInvestmentDate = `${formattedLastInvestment}${isLastInvestmentToday}${isLastInvestmentYesterday}`

  return (
    <>
      {!balanceData.is_ballance_enough && (
        <div>
          <p className={cn('flex space-x-2 ')}>
            <span className="text-destructive">Insufficient balance:</span>
            <span className="text-destructive">{USD(balanceData?.balance ?? 0, 2)}</span>
          </p>
          <p className={cn('flex space-x-2')}>
            <span>Minimal balance:</span>
            <span>{USD(balanceData.minimum_balance)}</span>
          </p>
          <Button
            variant="link"
            className="h-6 p-0"
            onClick={() => window.open('https://p2p.binance.com/uk-UA', '_blank')}
          >
            Refill balance
          </Button>
        </div>
      )}
      {balanceData.is_ballance_enough && (
        <div className="mb-1 space-y-1">
          <div className="flex space-x-2">
            <p className="text-gray-300 ">Suggested to buy:</p>
            <p className={cn('flex space-x-2')}>
              <span>{balanceData.suggested_coin}</span>
              <span>|</span>
            </p>
            <Button
              variant="link"
              className="h-6 p-0"
              onClick={() => onBuyCoin(balanceData.suggested_coin)}
              disabled={isLoading}
            >
              {isLoading && (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              )}
              {!isLoading && `Buy ${balanceData.suggested_coin}`}
            </Button>
          </div>
          <div className="flex space-x-2">
            <p className="text-gray-300 ">Suggested purchase amount: {USD(purchaseAmount)}</p>
            <span>|</span>
            <Button variant="link" className="h-6 p-0" onClick={openDialog}>
              Change
            </Button>
            {isPurchaseAmountCustom && (
              <>
                <span>|</span>
                <Button variant="link" className="h-6 p-0" onClick={() => onPurchaseAmountChange(null)}>
                  Revert
                </Button>
              </>
            )}
            {isOpen && (
              <EarnUpdateBidDialog
                open
                onOpenChange={closeDialog}
                initialValue={purchaseAmount}
                onSubmit={(amount) => {
                  onPurchaseAmountChange(amount)
                }}
              />
            )}
          </div>
          <p className="mb-2 text-gray-300">Binance Balance: {USD(balanceData?.balance ?? 0, 2)}</p>
        </div>
      )}
      <div>
        <p className="text-gray-300 ">Last Investment was made: {lastInvestmentDate}</p>
      </div>
    </>
  )
}

export default EarnSummary
