import { History, HandCoins } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ROUTES } from 'constants/routes'

const EarnTableActions = ({ coin, onRebalanceCoin }: { coin: string; onRebalanceCoin: () => void }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none" asChild>
        <Button variant="link">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-background">
        <DropdownMenuItem className="focus:bg-muted">
          <Link to={`${ROUTES.EARN_HISTORY}/${coin}`} className="flex gap-2 align-middle">
            <History />
            <span>Orders History</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className=" focus:bg-muted" onSelect={onRebalanceCoin}>
          <HandCoins />
          <span>Rebalance</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default EarnTableActions
