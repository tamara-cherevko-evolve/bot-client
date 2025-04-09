import { createBrowserRouter, Navigate } from 'react-router-dom'

import AppLayout from 'AppLayout'
import { ROUTES } from 'constants/routes'
import EarnOrdersHistory from 'pages/earn/EarnOrdersHistory'
import EarnPage from 'pages/earn/EarnPage'
import TradingPage from 'pages/trading/TradingPage'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: (
          <Navigate
            to={{
              pathname: ROUTES.EARN,
            }}
          />
        ),
      },
      {
        path: ROUTES.EARN,
        element: <EarnPage />,
      },
      {
        path: `${ROUTES.EARN_HISTORY}/:coin`,
        element: <EarnOrdersHistory />,
      },
      {
        path: ROUTES.TRADING,
        element: <TradingPage />,
      },
    ],
  },
])

export default router
