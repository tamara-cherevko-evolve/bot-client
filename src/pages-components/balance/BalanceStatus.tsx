import { CircleAlert, DollarSign } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import useGetBalance from 'hooks/queries/useGetBalance'
import { cn } from 'utils/cn'
import { USD } from 'utils/currency'

const BalanceStatus = () => {
  const { data, isPending, isError, error } = useGetBalance()
  if (isPending) {
    return <Skeleton className="w-full h-[54px] rounded-none" />
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="rounded-none">
        <CircleAlert className="w-4 h-4" />
        <AlertDescription>{`Can't get balance! ${error?.message}`}</AlertDescription>
      </Alert>
    )
  }

  if (!data) {
    return (
      <Alert variant="destructive" className="rounded-none">
        <CircleAlert className="w-4 h-4" />
        <AlertDescription>No balance!</AlertDescription>
      </Alert>
    )
  }

  const isBalanceEnoughMessage = data.is_ballance_enough ? 'Balance is ok!' : 'Insufficient balance!'
  const textColor = data.is_ballance_enough ? 'text-emerald-800' : '!text-red-500'

  return (
    <Alert className={cn('rounded-none', textColor)}>
      <DollarSign className={cn('w-4 h-4', textColor)} />
      <AlertDescription>{`${isBalanceEnoughMessage} Available balance: ${USD(data.balance)}. Min balance to start a grid is: ${USD(data.minimum_balance)}`}</AlertDescription>
    </Alert>
  )
}

export default BalanceStatus
