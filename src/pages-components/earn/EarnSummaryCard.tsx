import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { IEarnSummary } from 'interfaces/earn/interface'
import { WithLoading } from 'shared-components'
import { cn } from 'utils/cn'
import { USD } from 'utils/currency'

interface EarnSummaryCardProps {
  summaryItem: IEarnSummary
  className?: string
  isLoading: boolean
  onBuyCoin: (coin: string) => void
}
const EarnSummaryCard = ({ summaryItem, className, onBuyCoin, isLoading }: EarnSummaryCardProps) => {
  if (!summaryItem) return null

  const { coin, amount, spent, diff_in_dollars, diff_in_percent, current_price, avg_price } = summaryItem
  const isPositive = diff_in_dollars > 0

  const earningColor = isPositive ? 'text-green-500' : 'text-red-500'

  return (
    <WithLoading isLoading={isLoading} className={className}>
      <Card>
        <CardHeader>
          <CardTitle>{coin}</CardTitle>
          <CardDescription>
            <span className={cn('text-lg font-semibold block', earningColor)}>{current_price}</span>
            <span className="text-gray-100">{avg_price}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className={cn(earningColor)}>
            Earning: {USD(diff_in_dollars)} / {diff_in_percent}%
          </p>
          <p>Spent: {USD(spent)}</p>
          <p>Amount: {amount}</p>
        </CardContent>
        <CardFooter>
          <Button size="sm" onClick={() => onBuyCoin(summaryItem.coin)}>
            Buy coin
          </Button>
        </CardFooter>
      </Card>
    </WithLoading>
  )
}

export default EarnSummaryCard
