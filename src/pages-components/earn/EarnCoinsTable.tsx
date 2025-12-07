import { Card } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ICoin } from 'interfaces/coins/interface'
import { IEarnCoinSummary } from 'interfaces/earn/interface'
import { cn } from 'utils/cn'

import EarnSummaryTableRow from './EarnSummaryTableRow'

interface EarnCoinsTableProps {
  className?: string
  coins: (IEarnCoinSummary & ICoin)[]
  onBuyCoin: (coin: ICoin) => void
  onSellCoin: (coin: IEarnCoinSummary & ICoin) => void
}

const EarnCoinsTable = ({ className, coins, onBuyCoin, onSellCoin }: EarnCoinsTableProps) => {
  return (
    <Card className={cn('p-6', className)}>
      <p className="mb-4 text-gray-300">Summary Earning By Coins</p>
      <Table className="w-full text-white table-auto">
        <TableHeader>
          <TableRow className="border-none">
            <TableHead className="w-[130px] text-white">Coin</TableHead>
            <TableHead className="text-white">Current Prise / Earn Price</TableHead>
            <TableHead className="text-white">Earning</TableHead>
            <TableHead className="text-white">Spent</TableHead>
            <TableHead className="text-white">Current Value</TableHead>
            <TableHead className="text-white">Holdings %</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...coins]
            .sort((a, b) => Number(a.priority) - Number(b.priority))
            .map((item) => (
              <EarnSummaryTableRow summaryItem={item} onBuyCoin={onBuyCoin} onSellCoin={onSellCoin} key={item.name} />
            ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export default EarnCoinsTable
