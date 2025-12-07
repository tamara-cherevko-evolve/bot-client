import { Star, History } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ROUTES } from 'constants/routes'
import { ICoin } from 'interfaces/coins/interface'
import { IEarnCoinSummary } from 'interfaces/earn/interface'
import { CoinIcon } from 'shared-components'
import { cn } from 'utils/cn'
import { getCoinAmount, getCoinPrice, getCoinSpent, getDiffInDollars, getDiffInPercentage } from 'utils/coin'
import { USD } from 'utils/currency'

interface EarnSummaryCardProps {
  summaryItem: IEarnCoinSummary & ICoin
  className?: string
  onBuyCoin: (coin: ICoin) => void
  onSellCoin: (coin: IEarnCoinSummary & ICoin) => void
}

const EarnSummaryTableRow = ({ summaryItem, className, onBuyCoin, onSellCoin }: EarnSummaryCardProps) => {
  if (!summaryItem) return null

  const { name, amount, spent, diff_in_dollars, diff_in_percentage, current_price, avg_price, holdings_percentage } =
    summaryItem

  const isPositive = diff_in_dollars > 0
  const earningColor = isPositive ? 'text-green-500' : 'text-red-500'
  const price = current_price ?? '-'
  const avgPrice = getCoinPrice(avg_price, summaryItem)
  const diffInDollars = getDiffInDollars(diff_in_dollars)
  const diffInPercentage = getDiffInPercentage(diff_in_percentage)
  const totalSpent = getCoinSpent(spent)
  const currentValue = amount && current_price ? USD(amount * current_price) : '-'
  const totalAmount = getCoinAmount(amount, summaryItem)

  return (
    <TableRow className={cn(className)}>
      <TableCell className="font-medium w-28">
        <a
          href={`https://www.binance.com/uk-UA/trade/${name}_USDT?type=spot`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center"
        >
          <CoinIcon coin={name} className="mr-2" />
          {name}
          {summaryItem.is_preferred && <Star className="w-4 h-4 ml-2 text-yellow-400 fill-yellow-400" />}
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
      <TableCell className={cn(earningColor)}>{currentValue}</TableCell>
      <TableCell>{holdings_percentage ? `${holdings_percentage.toFixed(2)}%` : '-'}</TableCell>
      <TableCell>{totalAmount}</TableCell>
      <TableCell className="text-right">
        <div className="flex gap-4 justify-end w-full">
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 w-16 text-white"
            onClick={() => onBuyCoin(summaryItem)}
          >
            Buy
          </Button>
          <Button
            size="sm"
            className="w-16 bg-rose-500 hover:bg-rose-700 text-white"
            onClick={() => onSellCoin(summaryItem)}
          >
            Sell
          </Button>
          <Button variant="link">
            <Link to={`${ROUTES.EARN_HISTORY}/${name}`}>
              <History className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default EarnSummaryTableRow
