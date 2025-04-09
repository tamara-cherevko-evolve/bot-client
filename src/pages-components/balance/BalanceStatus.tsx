import { CircleAlert, DollarSign } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import useGetBalance from 'hooks/queries/useGetBalance'
import { cn } from 'utils/cn'
import { USD } from 'utils/currency'

const BalanceStatus = () => {
  const { data, isPending, isError, error } = useGetBalance()

  if (isError) {
    return (
      <Alert variant="destructive" className="rounded-none">
        <CircleAlert className="w-4 h-4" />
        <AlertDescription>{`Can't get balance! ${error?.message}`}</AlertDescription>
      </Alert>
    )
  }

  const isBalanceEnoughMessage = data && data > 5 ? 'Balance is ok!' : 'Insufficient balance!'
  const textColor = data && data > 5 ? 'text-emerald-800' : '!text-red-500'

  return (
    <Card className={cn('p-6 h-48')}>
      <p className="mb-4 text-gray-300">Suggested Investment for Today</p>
      {isPending && (
        <>
          <Skeleton className="w-64 h-6 mt-1" />
          <Skeleton className="w-64 h-6 mt-3" />
          <Skeleton className="w-64 h-6 mt-3" />
        </>
      )}
      <DollarSign className={cn('w-4 h-4', textColor)} />
      <AlertDescription>{`${isBalanceEnoughMessage} Available balance: ${USD(data || 0)}. Min balance to start a grid is: ${USD(5)}`}</AlertDescription>
    </Card>
  )
}

export default BalanceStatus
