import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { ROUTES } from 'constants/routes'
import useGetCoins from 'hooks/queries/useGetCoins'
import { EarnContent, EarnTabs } from 'pages-components'
import { ErrorBoundary } from 'shared-components'

import Layout from './Layout'

const EarnOrdersHistory = () => {
  const { data: coins } = useGetCoins()
  const { coin } = useParams()

  if (!coins?.length) return null

  const tabs = coins
    .sort((a, b) => Number(a.priority) - Number(b.priority))
    .map((coin) => ({
      name: coin.name,
      title: coin.title,
      content: <EarnContent coin={coin} />,
    }))

  return (
    <>
      <Link to={ROUTES.EARN}>
        <Button variant="link" className="mb-4 -ml-4">{`< Back`}</Button>
      </Link>
      <EarnTabs tabs={tabs} defaultTab={coin ?? tabs[0].name} />
    </>
  )
}

const EarnOrdersHistoryWithLayout = () => (
  <Layout>
    <ErrorBoundary errorText="Error: Something went wrong while fetching earn data.">
      <EarnOrdersHistory />
    </ErrorBoundary>
  </Layout>
)

export default EarnOrdersHistoryWithLayout
