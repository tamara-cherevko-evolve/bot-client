import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ICoin } from 'interfaces/coins/interface'
import { IEarnCoinSummary } from 'interfaces/earn/interface'
import { CoinIcon } from 'shared-components'
import { cn } from 'utils/cn'
import { getCoinAmount, getCoinPrice, getCoinSpent, getDiffInDollars, getDiffInPercentage } from 'utils/coin'

import EarnTableActions from './EarnTableActions'

interface EarnSummaryCardProps {
  summaryItem: IEarnCoinSummary & ICoin
  className?: string
  onBuyCoin: (coin: ICoin) => void
  onRebalanceCoin: (coin: string) => void
}

const EarnSummaryTableRow = ({ summaryItem, className, onBuyCoin, onRebalanceCoin }: EarnSummaryCardProps) => {
  if (!summaryItem) return null

  const { coin, amount, spent, diff_in_dollars, diff_in_percentage, current_price, avg_price } = summaryItem

  const isPositive = diff_in_dollars > 0
  const earningColor = isPositive ? 'text-green-500' : 'text-red-500'
  const price = current_price ?? '-'
  const avgPrice = getCoinPrice(avg_price, summaryItem)
  const diffInDollars = getDiffInDollars(diff_in_dollars)
  const diffInPercentage = getDiffInPercentage(diff_in_percentage)
  const totalSpent = getCoinSpent(spent)
  const totalAmount = getCoinAmount(amount, summaryItem)

  return (
    <TableRow className={cn(className)}>
      <TableCell className="font-medium w-28">
        <a href={`https://www.binance.com/uk-UA/trade/${coin}_USDT?type=spot`} target="_blank" rel="noreferrer">
          <CoinIcon coin={coin} className="mr-2" />
          {coin}
        </a>
      </TableCell>
      <TableCell>
        <span className={cn('text-lg  block', earningColor)}>{price}</span>
        <span className="text-gray-100">{avgPrice}</span>
      </TableCell>
      <TableCell>
        <span className={cn('text-lg  block', earningColor)}>{diffInDollars}</span>
        <span className={cn(earningColor)}>{diffInPercentage}</span>
      </TableCell>
      <TableCell>{totalSpent}</TableCell>
      <TableCell>{totalAmount}</TableCell>
      <TableCell className="w-12 text-right">
        <Button size="sm" onClick={() => onBuyCoin(summaryItem)}>
          Buy coin
        </Button>
      </TableCell>
      <TableCell className="w-12 text-right">
        <EarnTableActions coin={coin} onRebalanceCoin={() => onRebalanceCoin(coin)} />
      </TableCell>
    </TableRow>
  )
}

export default EarnSummaryTableRow
