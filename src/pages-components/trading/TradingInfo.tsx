import { cn } from 'utils/cn'
import { USD } from 'utils/currency'

const TradingInfo = ({ className }: { className?: string }) => {
  const totalBalanceColor = 1 > 0 ? 'text-positive' : 'text-destructive'
  const earnColor = 2 > 0 ? 'text-positive' : 'text-destructive'

  const values = [
    {
      title: 'Local Result',
      value: `${USD(2)}`,
      additionalValue: `${5}%`,
      valueColor: earnColor,
    },
    {
      title: 'Total Balance',
      value: `${USD(5)}`,
      valueColor: totalBalanceColor,
    },
    {
      title: 'Total Spent',
      value: `${USD(67)}`,
    },
  ]

  return (
    <div className={cn('flex justify-between space-x-4 h-20', className)}>
      {values.map(({ title, value, additionalValue, valueColor }) => (
        <div key={title} className="md:flex-1">
          <p className="text-secondary-foreground">{title}</p>
          <h2 className={cn(valueColor, 'text-xl mt-2')}>{value}</h2>
          <p className={cn(valueColor)}>{additionalValue}</p>
        </div>
      ))}
    </div>
  )
}

export default TradingInfo
