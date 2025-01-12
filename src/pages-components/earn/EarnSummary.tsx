import { isToday, isValid, isYesterday, max } from 'date-fns'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ICoin } from 'interfaces/coins/interface'
import { IEarnSummary } from 'interfaces/earn/interface'
import { cn } from 'utils/cn'
import { USD } from 'utils/currency'
import { formatDate } from 'utils/date'

interface EarnSummaryProps {
  earnSummary: IEarnSummary
  isLoading: boolean
  purchaseAmount: number
  isPurchaseAmountCustom: boolean
  onBuyCoin: (coin: ICoin) => void
  onPurchaseAmountChange: (amount: number | null) => void
}
const EarnSummary = ({ earnSummary, isLoading, purchaseAmount, onBuyCoin }: EarnSummaryProps) => {
  const coins = earnSummary.summary || []
  const isBalanceEnough = earnSummary.balance > earnSummary.suggested_bid
  const lastInvestment = max(coins.map((coin) => new Date(coin.last_investment)))
  const formattedLastInvestment = isValid(lastInvestment) ? formatDate(lastInvestment) : ''
  const isLastInvestmentToday = isValid(lastInvestment) && isToday(lastInvestment) ? ' (Today)' : ''
  const isLastInvestmentYesterday = isValid(lastInvestment) && isYesterday(lastInvestment) ? ' (Yesterday)' : ''
  const lastInvestmentDate = `${formattedLastInvestment}${isLastInvestmentToday}${isLastInvestmentYesterday}`
  const suggestedCoin = coins.find((coin) => coin.coin_id === earnSummary.suggested_coin_id)

  return (
    <>
      {!isBalanceEnough && (
        <div>
          <p className={cn('flex space-x-2 ')}>
            <span className="text-destructive">Insufficient balance:</span>
            <span className="text-destructive">{USD(earnSummary?.balance ?? 0, 2)}</span>
          </p>
          <p className={cn('flex space-x-2')}>
            <span>Minimal balance:</span>
            <span>{USD(earnSummary.suggested_bid)}</span>
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
      {isBalanceEnough && suggestedCoin && (
        <div className="mb-1 space-y-1">
          <div className="flex space-x-2">
            <p className="text-gray-300 ">Suggested to buy:</p>
            <p className={cn('flex space-x-2')}>
              <span>{suggestedCoin.name}</span>
              <span>|</span>
            </p>
            <Button variant="link" className="h-6 p-0" onClick={() => onBuyCoin(suggestedCoin)} disabled={isLoading}>
              {isLoading && (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              )}
              {!isLoading && `Buy ${suggestedCoin.name}`}
            </Button>
          </div>
          <div className="flex space-x-2">
            <p className="text-gray-300 ">Suggested purchase amount: {USD(purchaseAmount)}</p>
          </div>
          <p className="mb-2 text-gray-300">Binance Balance: {USD(earnSummary?.balance ?? 0, 2)}</p>
        </div>
      )}
      <div>
        <p className="text-gray-300 ">Last Investment was made: {lastInvestmentDate}</p>
      </div>
    </>
  )
}

export default EarnSummary
