import { Outlet } from 'react-router-dom'

import { Toaster } from '@/components/ui/toaster'
import useGetCoins from 'hooks/queries/useGetCoins'
import { Navigation, WithLoading } from 'shared-components'

const AppLayout = () => {
  const { data: coins, isPending } = useGetCoins()

  if (isPending) {
    return <WithLoading isLoading={true} className="h-80" transparent />
  }

  if (!coins?.length) return <div>No coins</div>

  return (
    <div>
      <Navigation />
      <Outlet />
      <Toaster />
    </div>
  )
}

export default AppLayout
