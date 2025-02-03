import { Badge } from '@/components/ui/badge'
import { EarnDirection } from 'interfaces/earn/interface'

const EarnDirectionBadge = ({ direction }: { direction: EarnDirection }) => {
  const variant = direction === EarnDirection.BUY ? 'positive' : 'destructive'
  return (
    <Badge variant={variant} className="rounded-sm px-4 uppercase">
      {direction}
    </Badge>
  )
}

export default EarnDirectionBadge
