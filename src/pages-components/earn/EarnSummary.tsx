import { Loader2, PieChart, Star, TrendingUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ICoin } from 'interfaces/coins/interface'
import { IEarnSummary, ISuggestedSell } from 'interfaces/earn/interface'
import { cn } from 'utils/cn'
import { USD } from 'utils/currency'

interface EarnSummaryProps {
  earnSummary: IEarnSummary
  isLoading: boolean
  purchaseAmount: number
  onBuyCoin: (coin: ICoin) => void
  onSellCoin: (coin: ISuggestedSell) => void
}
const EarnSummary = ({ earnSummary, isLoading, purchaseAmount, onBuyCoin, onSellCoin }: EarnSummaryProps) => {
  const coins = earnSummary.summary || []
  const suggestedSell = earnSummary.suggested_sell || []
  const allocation = earnSummary.allocation
  const isBalanceEnough = earnSummary.balance > earnSummary.suggested_buy
  const suggestedCoin = coins.find((coin) => coin.id === earnSummary.suggested_coin_id)
  const preferredPercentage = allocation ? 100 - allocation.secondary_percentage : 0

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
            <span>{USD(earnSummary.suggested_buy)}</span>
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
      {isBalanceEnough && purchaseAmount < 5 && (
        <div className="mb-1 space-y-1">
          <p className="text-muted-foreground">No suggestion for today left</p>
          <p className="mb-2 text-gray-300">Binance Balance: {USD(earnSummary?.balance ?? 0, 2)}</p>
        </div>
      )}
      {isBalanceEnough && purchaseAmount >= 5 && suggestedCoin && (
        <div className="mb-1 space-y-1">
          <div className="flex space-x-2">
            <p className="text-gray-300 ">Suggested to buy:</p>
            <p className={cn('flex items-center space-x-2')}>
              <span className="flex items-center">
                {suggestedCoin.name}
                {suggestedCoin.is_preferred && <Star className="w-4 h-4 ml-1 text-yellow-400 fill-yellow-400" />}
              </span>
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

      {/* Suggested Sell Section */}
      {suggestedSell.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-gray-300 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-red-500" />
            Suggested to sell (profitable coins):
          </p>
          <div className="space-y-2">
            {suggestedSell.map((coin) => (
              <div key={coin.id} className="flex items-center gap-4 text-sm">
                <span className="font-medium w-16">{coin.name}</span>
                <span className="text-green-500">+{coin.profit_percentage.toFixed(2)}%</span>
                <span className="text-green-500">+{USD(coin.profit_dollars)}</span>
                <span className="text-muted-foreground">{USD(coin.current_value)}</span>

                <Button
                  variant="link"
                  size="sm"
                  className="h-6 p-0 text-rose-500"
                  onClick={() => onSellCoin(coin)}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Please wait
                    </>
                  )}
                  {!isLoading && `Sell ${coin.name}`}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Allocations Section */}
      {allocation && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-gray-300 mb-6 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-blue-500" />
            Portfolio Allocation
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span>Foundational coins: {USD(allocation.preferred_spent)}</span>
                <span className="text-muted-foreground">({preferredPercentage.toFixed(1)}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span>High-risk coins: {USD(allocation.secondary_spent)}</span>
                <span
                  className={cn(
                    allocation.secondary_percentage > allocation.target_secondary_percentage
                      ? 'text-amber-500'
                      : 'text-muted-foreground'
                  )}
                >
                  ({allocation.secondary_percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="flex h-2 overflow-hidden rounded-full bg-muted">
              <div className="bg-yellow-500 transition-all" style={{ width: `${preferredPercentage}%` }} />
              <div className="bg-rose-500 transition-all" style={{ width: `${allocation.secondary_percentage}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">
              Target secondary: {allocation.target_secondary_percentage}%
              {allocation.secondary_percentage > allocation.target_secondary_percentage && (
                <span className="text-amber-500 ml-2">
                  (over target by{' '}
                  {(allocation.secondary_percentage - allocation.target_secondary_percentage).toFixed(1)}%)
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default EarnSummary
