import { Outlet } from 'react-router-dom'

import { Toaster } from '@/components/ui/toaster'
import { Navigation } from 'shared-components'

const AppLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Toaster />
    </div>
  )
}

export default AppLayout
