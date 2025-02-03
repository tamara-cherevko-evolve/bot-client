import Big from 'big.js'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ICoin } from 'interfaces/coins/interface'
import { IEarnData } from 'interfaces/earn/interface'
import EarnDirectionBadge from 'shared-components/earn-direction-badge/EarnDirectionBadge'
import { getCoinAmount, getCoinPrice, getCoinSpent } from 'utils/coin'
import { USD } from 'utils/currency'
import { formatDate } from 'utils/date'

interface EarnDataTableProps {
  data: IEarnData[]
  coin: ICoin
}

const EarnDataTable = ({ data, coin }: EarnDataTableProps) => {
  if (!data) return null

  return (
    <Table className="w-full text-white table-fixed">
      <TableCaption className="text-white">{`Earn History for ${coin.title}`}</TableCaption>
      <TableHeader>
        <TableRow className="font-bold  border-transparent bg-primary/90 mt-[-1px]">
          <TableHead className="text-black">Date</TableHead>
          <TableHead className="text-black">Amount</TableHead>
          <TableHead className="text-black">Price</TableHead>
          <TableHead className="text-black">Total</TableHead>
          <TableHead className="text-black">Commission</TableHead>
          <TableHead className="text-black flex items-center justify-center w-40">Direction</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{formatDate(item.date)}</TableCell>
            <TableCell>{getCoinAmount(item.amount, coin)}</TableCell>
            <TableCell>{getCoinPrice(item.price, coin)}</TableCell>
            <TableCell>{getCoinSpent(item.total)}</TableCell>
            <TableCell>{USD(item.commission, 5)}</TableCell>
            <TableCell className="flex items-center justify-center w-40">
              <EarnDirectionBadge direction={item.direction} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default EarnDataTable
