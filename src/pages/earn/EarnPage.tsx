import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import useBuyCoin from 'hooks/queries/earn/useBuyCoin'
import useGetEarnSummary from 'hooks/queries/earn/useGetEarnSummary'
import useSellCoin from 'hooks/queries/earn/useSellCoin'
import { EarnSummary } from 'pages-components'
import EarnCoinsTable from 'pages-components/earn/EarnCoinsTable'
import EarnSummaryTopInfo from 'pages-components/earn/EarnSummaryTopInfo'
import { ErrorBoundary, WithLoading } from 'shared-components'
import { cn } from 'utils/cn'

import Layout from './Layout'

const EarnPage = () => {
  const { data: earnSummary, isFetching: isFetchingEarnSummary, isPending: isEarnSummaryPending } = useGetEarnSummary()

  const { buyCoin, isPending: buyCoinIsPending, ConfirmEarnBuyCoinDialog } = useBuyCoin()
  const { sellCoin, isPending: sellCoinIsPending, ConfirmEarnSellCoinDialog } = useSellCoin()

  const purchaseAmount = earnSummary?.suggested_buy ?? 0

  return (
    <>
      <EarnSummaryTopInfo earnSummary={earnSummary || null} isLoading={isFetchingEarnSummary} className="mb-8" />
      <Card className={cn('p-6')}>
        <p className="mb-4 text-gray-300">Suggested Investment for Today</p>
        {isEarnSummaryPending && (
          <>
            <Skeleton className="w-64 h-6 mt-1" />
            <Skeleton className="w-64 h-6 mt-3" />
            <Skeleton className="w-64 h-6 mt-3" />
          </>
        )}
        {earnSummary && (
          <EarnSummary
            earnSummary={earnSummary}
            isLoading={isFetchingEarnSummary || sellCoinIsPending}
            purchaseAmount={purchaseAmount}
            onBuyCoin={(coin) => buyCoin(coin, purchaseAmount)}
            onSellCoin={(coin) =>
              sellCoin({ ...coin, title: coin.name, priority: '0', amount_round_to: 4, price_round_to: 2 }, coin.amount)
            }
          />
        )}
      </Card>
      {isEarnSummaryPending && <Skeleton className="w-full mt-8 h-96" />}
      {!isEarnSummaryPending && (
        <>
          <WithLoading isLoading={buyCoinIsPending || sellCoinIsPending || isFetchingEarnSummary}>
            <EarnCoinsTable
              className={cn('mt-8')}
              coins={earnSummary?.summary || []}
              onBuyCoin={(coin) => buyCoin(coin, purchaseAmount)}
              onSellCoin={(coin) => sellCoin(coin, coin.amount)}
            />
          </WithLoading>
          <ConfirmEarnBuyCoinDialog />
          <ConfirmEarnSellCoinDialog />
        </>
      )}
    </>
  )
}

const EarnPageWithBoundaries = () => {
  return (
    <Layout>
      <ErrorBoundary errorText="Error: Something went wrong while fetching earn summary data.">
        <EarnPage />
      </ErrorBoundary>
    </Layout>
  )
}

export default EarnPageWithBoundaries
