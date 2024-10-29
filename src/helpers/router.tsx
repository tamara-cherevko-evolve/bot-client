import { createBrowserRouter } from 'react-router-dom'

import AppLayout from 'AppLayout'
import { ROUTES } from 'constants/routes'
import EarnPage from 'pages/earn/EarnPage'
import HomePage from 'pages/home/HomePage'
import TradingPage from 'pages/trading/TradingPage'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'earn',
        element: <EarnPage />,
      },
      {
        path: 'trading',
        element: <TradingPage />,
      },
    ],
  },
])

export default router
