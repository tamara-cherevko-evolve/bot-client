import Big from 'big.js'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IEarnData } from 'interfaces/earn/interface'
import { USD } from 'utils/currency'

interface EarnDataTableProps {
  data: IEarnData[]
  coin: string
}

const EarnDataTable = ({ data, coin }: EarnDataTableProps) => {
  if (!data) return null

  const totalAmount = data.reduce((sum, item) => sum.plus(item.amount || 0), Big(0)).toNumber()
  const totalSpent = data.reduce((sum, item) => sum.plus(item.total || 0), Big(0)).toNumber()
  const totalCommission = data.reduce((sum, item) => sum.plus(item.commission || 0), Big(0)).toNumber()
  const weightedAvgPrice = totalAmount > 0 ? Big(totalSpent).div(totalAmount).toNumber() : 0

  return (
    <Table className="w-full text-white table-fixed">
      <TableCaption>{`A list of ${coin} investments`}</TableCaption>
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
          <TableCell>{totalAmount}</TableCell>
          <TableCell>{USD(weightedAvgPrice, 8)}</TableCell>
          <TableCell>{USD(totalSpent, 2)}</TableCell>
          <TableCell>{USD(totalCommission, 2)}</TableCell>
        </TableRow>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell>{USD(item.price, 8)}</TableCell>
            <TableCell>{USD(item.total, 8)}</TableCell>
            <TableCell>{USD(item.commission, 8)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default EarnDataTable
