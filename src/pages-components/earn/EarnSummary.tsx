import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import useBuyCoin from 'hooks/queries/earn/useBuyCoin'
import useGetEarnBalanceWithSuggestion from 'hooks/queries/earn/useGetEarnBalanceWithSuggestion'
import useGetEarnSummary from 'hooks/queries/earn/useGetEarnSummary'
import { EarnSummaryCard } from 'pages-components'
import { ErrorBoundary } from 'shared-components'
import { cn } from 'utils/cn'
import { USD } from 'utils/currency'

import EarnSummaryTopInfo from './EarnSummaryTopInfo'

const EarnSummary = () => {
  const { data: earnSummary, isFetching: isFetchingEarnSummary } = useGetEarnSummary()
  const {
    data: balanceData,
    isPending: balanceIsPending,
    isFetching: isFetchingBalanceData,
  } = useGetEarnBalanceWithSuggestion()
  const { buyCoin, isPending: buyCoinIsPending, ConfirmEarnBuyCoinDialog } = useBuyCoin()

  const coins = Object.values(earnSummary || {})

  return (
    <>
      <EarnSummaryTopInfo
        earnSummary={earnSummary || null}
        balanceData={balanceData || null}
        isLoading={isFetchingEarnSummary || isFetchingBalanceData}
        className="mb-8"
      />

      <Card className={cn('p-6')}>
        <p className="mb-2 text-gray-300">Suggested coin to buy</p>
        {balanceIsPending && <Skeleton className="w-64 h-6 mt-1" />}
        {balanceData && (
          <>
            {!balanceData.is_ballance_enough && (
              <p className={cn('flex space-x-2')}>
                <span>Minimal balance:</span>
                <span>{USD(balanceData.minimum_balance)}</span>
              </p>
            )}
            {balanceData.is_ballance_enough && (
              <div className="flex space-x-2">
                <p className={cn('flex space-x-2')}>
                  <span>{balanceData.suggested_coin}</span>
                  <span>|</span>
                </p>
                <Button
                  variant="link"
                  className="h-6 p-0"
                  onClick={() => buyCoin(balanceData.suggested_coin)}
                  disabled={buyCoinIsPending}
                >
                  {buyCoinIsPending && (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Please wait
                    </>
                  )}
                  {!buyCoinIsPending && `Buy ${balanceData.suggested_coin}`}
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
      <div className="flex items-start mt-8 space-x-4">
        {coins.map((coin) => (
          <EarnSummaryCard
            key={coin.coin}
            className="flex-1"
            summaryItem={coin}
            onBuyCoin={buyCoin}
            isLoading={isFetchingBalanceData || isFetchingEarnSummary}
          />
        ))}
      </div>

      <ConfirmEarnBuyCoinDialog />
    </>
  )
}

const EarnSummaryWithErrorBoundary = () => (
  <ErrorBoundary errorText="Error: Something went wrong while fetching earn summary data.">
    <EarnSummary />
  </ErrorBoundary>
)

export default EarnSummaryWithErrorBoundary
