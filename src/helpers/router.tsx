import { createBrowserRouter, Navigate } from 'react-router-dom'

import AppLayout from 'AppLayout'
import { ROUTES } from 'constants/routes'
import EarnOrdersHistory from 'pages/earn/EarnOrdersHistory'
import EarnPage from 'pages/earn/EarnPage'
import OverviewPage from 'pages/overview/OverviewPage'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '', element: <Navigate to={{ pathname: ROUTES.OVERVIEW }} /> },
      { path: ROUTES.OVERVIEW, element: <OverviewPage /> },
      { path: ROUTES.EARN, element: <EarnPage /> },
      { path: `${ROUTES.EARN_HISTORY}/:coin`, element: <EarnOrdersHistory /> },
    ],
  },
])

export default router
