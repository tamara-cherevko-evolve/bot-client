import { ArrowDownRight, ArrowUpRight, Briefcase, PiggyBank, TrendingUp, Wallet } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import useGetEarnSummary from 'hooks/queries/earn/useGetEarnSummary'
import { cn } from 'utils/cn'
import { USD } from 'utils/currency'

import Layout from './Layout'

// Mock data for family investments - replace with real API data
const MOCK_INVESTMENTS = {
  crypto: {
    invested: 2500,
    current: 3150,
    name: 'Крипта',
  },
  blagoInvest: {
    invested: 15000,
    current: 16200,
    name: 'Blago Invest',
  },
  savings: {
    invested: 5000,
    current: 5250,
    name: 'Заощадження',
  },
}

interface InvestmentCardProps {
  title: string
  invested: number
  current: number
  icon: React.ReactNode
  className?: string
}

const InvestmentCard = ({ title, invested, current, icon, className }: InvestmentCardProps) => {
  const profit = current - invested
  const profitPercent = invested > 0 ? ((profit / invested) * 100).toFixed(2) : '0.00'
  const isPositive = profit >= 0

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <div
        className={cn(
          'absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10',
          isPositive ? 'bg-green-500' : 'bg-red-500'
        )}
      />
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-muted">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{USD(current)}</div>
        <div className="flex items-center mt-2 space-x-2 text-sm">
          <span className="text-muted-foreground">Вкладено: {USD(invested)}</span>
        </div>
        <div
          className={cn('flex items-center mt-2 text-sm font-medium', isPositive ? 'text-green-500' : 'text-red-500')}
        >
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          <span>
            {isPositive ? '+' : ''}
            {USD(profit)} ({profitPercent}%)
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

const OverviewPage = () => {
  const { data: earnSummary } = useGetEarnSummary()

  // Calculate crypto totals from earnSummary
  const cryptoInvested =
    earnSummary?.summary?.reduce((acc, coin) => acc + coin.spent, 0) ?? MOCK_INVESTMENTS.crypto.invested
  const cryptoCurrent =
    earnSummary?.summary?.reduce((acc, coin) => acc + coin.amount * coin.current_price, 0) ??
    MOCK_INVESTMENTS.crypto.current

  const cryptoData = {
    invested: cryptoInvested,
    current: cryptoCurrent,
  }

  const investments = [
    {
      ...cryptoData,
      title: 'Крипта (Binance)',
      icon: <TrendingUp className="w-5 h-5 text-amber-500" />,
    },
    {
      invested: MOCK_INVESTMENTS.blagoInvest.invested,
      current: MOCK_INVESTMENTS.blagoInvest.current,
      title: 'Blago Invest',
      icon: <Briefcase className="w-5 h-5 text-blue-500" />,
    },
    {
      invested: MOCK_INVESTMENTS.savings.invested,
      current: MOCK_INVESTMENTS.savings.current,
      title: 'Заощадження',
      icon: <PiggyBank className="w-5 h-5 text-pink-500" />,
    },
  ]

  const totalInvested = investments.reduce((acc, inv) => acc + inv.invested, 0)
  const totalCurrent = investments.reduce((acc, inv) => acc + inv.current, 0)
  const totalProfit = totalCurrent - totalInvested
  const totalProfitPercent = totalInvested > 0 ? ((totalProfit / totalInvested) * 100).toFixed(2) : '0.00'
  const isTotalPositive = totalProfit >= 0

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cherevko Investment</h1>
          <p className="mt-2 text-muted-foreground">Огляд всіх інвестицій та їх результатів</p>
        </div>

        {/* Total Summary Card */}
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card to-muted/30">
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
            <Wallet className="w-64 h-64 -mr-16 -mt-16" />
          </div>
          <CardHeader>
            <CardDescription className="text-base">Загальний баланс портфеля</CardDescription>
            <CardTitle className="text-4xl font-bold">{USD(totalCurrent)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-background/50">
                <p className="text-sm text-muted-foreground">Всього вкладено</p>
                <p className="mt-1 text-xl font-semibold">{USD(totalInvested)}</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50">
                <p className="text-sm text-muted-foreground">Прибуток / Збиток</p>
                <p
                  className={cn(
                    'mt-1 text-xl font-semibold flex items-center',
                    isTotalPositive ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {isTotalPositive ? (
                    <ArrowUpRight className="w-5 h-5 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 mr-1" />
                  )}
                  {isTotalPositive ? '+' : ''}
                  {USD(totalProfit)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background/50">
                <p className="text-sm text-muted-foreground">Відсоток прибутку</p>
                <p className={cn('mt-1 text-xl font-semibold', isTotalPositive ? 'text-green-500' : 'text-red-500')}>
                  {isTotalPositive ? '+' : ''}
                  {totalProfitPercent}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Breakdown */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Розподіл інвестицій</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {investments.map((investment) => (
              <InvestmentCard
                key={investment.title}
                title={investment.title}
                invested={investment.invested}
                current={investment.current}
                icon={investment.icon}
              />
            ))}
          </div>
        </div>

        {/* Allocation Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Розподіл портфеля</CardTitle>
            <CardDescription>Візуалізація розподілу інвестицій за категоріями</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {investments.map((inv, index) => {
                const percentage = totalCurrent > 0 ? ((inv.current / totalCurrent) * 100).toFixed(1) : 0
                const colors = ['bg-amber-500', 'bg-blue-500', 'bg-pink-500']
                return (
                  <div key={inv.title} className="flex items-center space-x-2">
                    <div className={cn('w-3 h-3 rounded-full', colors[index])} />
                    <span className="text-sm text-muted-foreground">
                      {inv.title}: {percentage}%
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="flex h-4 mt-4 overflow-hidden rounded-full">
              {investments.map((inv, index) => {
                const percentage = totalCurrent > 0 ? (inv.current / totalCurrent) * 100 : 0
                const colors = ['bg-amber-500', 'bg-blue-500', 'bg-pink-500']
                return (
                  <div
                    key={inv.title}
                    className={cn('transition-all duration-500', colors[index])}
                    style={{ width: `${percentage}%` }}
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default OverviewPage
