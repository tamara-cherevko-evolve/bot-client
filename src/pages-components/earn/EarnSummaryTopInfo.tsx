import { ReactNode } from 'react'

import Big from 'big.js'

import { Skeleton } from '@/components/ui/skeleton'
import { IEarnBalance } from 'interfaces/balance/interface'
import { IEarnSummary } from 'interfaces/earn/interface'
import { cn } from 'utils/cn'
import { USD } from 'utils/currency'

interface EarnSummaryTopInfoProps {
  earnSummary: IEarnSummary | null
  balanceData: IEarnBalance | null
  isLoading: boolean
  className?: string
}

const SECTIONS = {
  earn: 'Earn',
  totalBalance: 'Total Balance',
  totalSpent: 'Total Spent',
}

const SectionTitle = ({ children }: { children: ReactNode }) => <p className="text-secondary-foreground">{children}</p>

const EarnSummaryTopInfo = ({ earnSummary, balanceData, isLoading }: EarnSummaryTopInfoProps) => {
  if (isLoading) {
    return (
      <>
        {Object.values(SECTIONS).map((section) => (
          <div className="flex-1" key={section}>
            <SectionTitle>{section}</SectionTitle>
            <div className="mt-3 space-y-2">
              <Skeleton className="w-[40%] h-5" />
              <Skeleton className="w-[20%] h-5" />
            </div>
          </div>
        ))}
      </>
    )
  }

  if (!earnSummary || !balanceData) return null

  const coins = Object.values(earnSummary)
  const earn = coins.reduce((sum, coin) => sum.plus(coin.diff_in_dollars), Big(0)).toNumber()
  const totalSpent = coins.reduce((sum, coin) => sum.plus(coin.spent), Big(0)).toNumber()
  const totalBalance = Big(totalSpent).plus(earn).toNumber()
  const totalDiffInPercent = Big((earn * 100) / totalSpent).toFixed(2)
  const totalBalanceColor = totalBalance > 0 ? 'text-positive' : 'text-destructive'

  const values = [
    {
      title: SECTIONS.earn,
      value: `${USD(earn)}`,
      additionalValue: `${totalDiffInPercent}%`,
      valueColor: totalBalanceColor,
    },
    {
      title: SECTIONS.totalBalance,
      value: `${USD(totalBalance)}`,
      valueColor: totalBalanceColor,
    },
    {
      title: SECTIONS.totalSpent,
      value: `${USD(totalSpent)}`,
    },
  ]

  return (
    <>
      {values.map(({ title, value, additionalValue, valueColor }) => (
        <div className="flex-1" key={title}>
          <SectionTitle>{title}</SectionTitle>
          <h2 className={cn(valueColor, 'text-xl mt-2')}>{value}</h2>
          <p className={cn(valueColor)}>{additionalValue}</p>
        </div>
      ))}
    </>
  )
}

const EarnSummaryTopInfoWithLayout = ({ className, ...props }: EarnSummaryTopInfoProps) => (
  <div className={cn('flex justify-between space-x-4', className)}>
    <EarnSummaryTopInfo {...props} />
  </div>
)

export default EarnSummaryTopInfoWithLayout
