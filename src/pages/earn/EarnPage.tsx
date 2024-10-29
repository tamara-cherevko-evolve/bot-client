import useGetCoins from 'hooks/queries/useGetCoins'
import { EarnContent, EarnTabs, EarnSummary } from 'pages-components'
import { ErrorBoundary, WithLoading } from 'shared-components'

import Layout from './Layout'

const EarnPage = () => {
  const { data: coins, isPending } = useGetCoins()

  if (isPending) {
    return <WithLoading isLoading={true} className="h-80" transparent />
  }

  if (!coins?.length) return <div>No coins</div>

  const tabs = coins.map((coin) => ({
    name: coin.coin,
    title: coin.title,
    content: <EarnContent coin={coin.coin} />,
  }))

  return (
    <>
      <div className="mb-12">
        <EarnSummary />
      </div>
      <EarnTabs tabs={tabs} />
    </>
  )
}

const EarnPageWithLayout = () => (
  <Layout>
    <ErrorBoundary errorText="Error: Something went wrong while fetching earn data.">
      <EarnPage />
    </ErrorBoundary>
  </Layout>
)

export default EarnPageWithLayout
