import Big from 'big.js'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ICoin } from 'interfaces/coins/interface'
import { IEarnData } from 'interfaces/earn/interface'
import { getCoinAmount, getCoinPrice, getCoinSpent } from 'utils/coin'
import { USD } from 'utils/currency'
import { formatDate } from 'utils/date'

interface EarnDataTableProps {
  data: IEarnData[]
  coin: ICoin
}

const EarnDataTable = ({ data, coin }: EarnDataTableProps) => {
  if (!data) return null

  const totalAmount = data.reduce((sum, item) => sum.plus(item.amount || 0), Big(0)).toNumber()
  const totalSpent = data.reduce((sum, item) => sum.plus(item.total || 0), Big(0)).toNumber()
  const totalCommission = data.reduce((sum, item) => sum.plus(item.commission || 0), Big(0)).toNumber()
  const weightedAvgPrice = totalAmount > 0 ? Big(totalSpent).div(totalAmount).toNumber() : 0

  return (
    <Table className="w-full text-white table-fixed">
      <TableCaption className="text-white">{`Earn History for ${coin.title}`}</TableCaption>
      <TableHeader>
        <TableRow className="border-none">
          <TableHead className="w-[100px] text-white">ID</TableHead>
          <TableHead className="text-white">Date</TableHead>
          <TableHead className="text-white">Amount</TableHead>
          <TableHead className="text-white">Price</TableHead>
          <TableHead className="text-white">Total</TableHead>
          <TableHead className="text-white">Commission</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="font-bold text-black border-transparent bg-primary/90 mt-[-1px]">
          <TableCell></TableCell>
          <TableCell>Total:</TableCell>
          <TableCell>{getCoinAmount(totalAmount, coin)}</TableCell>
          <TableCell>{getCoinPrice(weightedAvgPrice, coin)}</TableCell>
          <TableCell>{getCoinSpent(totalSpent)}</TableCell>
          <TableCell>{USD(totalCommission, 2)}</TableCell>
        </TableRow>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{formatDate(item.date)}</TableCell>
            <TableCell>{getCoinAmount(item.amount, coin)}</TableCell>
            <TableCell>{getCoinPrice(item.price, coin)}</TableCell>
            <TableCell>{getCoinSpent(item.total)}</TableCell>
            <TableCell>{USD(item.commission, 5)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default EarnDataTable
