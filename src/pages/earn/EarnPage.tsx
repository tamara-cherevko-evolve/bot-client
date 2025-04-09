import { useState } from 'react'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import useBuyCoin from 'hooks/queries/earn/useBuyCoin'
import useGetEarnSummary from 'hooks/queries/earn/useGetEarnSummary'
import useRebalanceCoin from 'hooks/queries/earn/useRebalanceCoin'
import { EarnSummary } from 'pages-components'
import EarnCoinsTable from 'pages-components/earn/EarnCoinsTable'
import EarnRebalanceDialog from 'pages-components/earn/EarnRebalanceDialog'
import EarnSummaryTopInfo from 'pages-components/earn/EarnSummaryTopInfo'
import { ErrorBoundary, WithLoading } from 'shared-components'
import { cn } from 'utils/cn'

import Layout from './Layout'

const EarnPage = () => {
  const [customPurchaseAmount, setCustomPurchaseAmount] = useState<number | null>(null)
  const { data: earnSummary, isFetching: isFetchingEarnSummary, isPending: isEarnSummaryPending } = useGetEarnSummary()

  const { buyCoin, isPending: buyCoinIsPending, ConfirmEarnBuyCoinDialog } = useBuyCoin()
  const { rebalanceCoin, startRebalanceCoin, saveRebalanceCoin, isOpen, closeDialog, isPending, error } =
    useRebalanceCoin()

  const purchaseAmount = customPurchaseAmount ?? earnSummary?.suggested_bid ?? 0
  // const rebalanceEarnSummaryForCoin = rebalanceCoin?.coin
  //   ? earnSummary?.find((coin) => coin.coin === rebalanceCoin.coin)
  //   : null

  // console.log('earnSummary:', rebalanceEarnSummaryForCoin)

  return (
    <>
      <EarnSummaryTopInfo earnSummary={earnSummary || null} isLoading={isFetchingEarnSummary} className="mb-8" />
      <Card className={cn('p-6 h-48')}>
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
            onPurchaseAmountChange={setCustomPurchaseAmount}
            earnSummary={earnSummary}
            isLoading={isFetchingEarnSummary}
            purchaseAmount={purchaseAmount}
            isPurchaseAmountCustom={customPurchaseAmount !== null}
            onBuyCoin={(coin) => buyCoin(coin, purchaseAmount)}
          />
        )}
      </Card>
      {isEarnSummaryPending && <Skeleton className="w-full mt-8 h-96" />}
      {!isEarnSummaryPending && (
        <>
          <WithLoading isLoading={buyCoinIsPending || isFetchingEarnSummary}>
            <EarnCoinsTable
              className={cn('mt-8')}
              coins={earnSummary?.summary || []}
              onBuyCoin={(coin) => buyCoin(coin, purchaseAmount)}
              onRebalanceCoin={startRebalanceCoin}
            />
          </WithLoading>
          <ConfirmEarnBuyCoinDialog />
          {/* {!!rebalanceEarnSummaryForCoin && (
            <EarnRebalanceDialog
              coin={rebalanceEarnSummaryForCoin}
              open={isOpen}
              closeDialog={() => closeDialog()}
              onSubmit={saveRebalanceCoin}
              isLoading={isPending}
              error={error?.message}
            />
          )} */}
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
