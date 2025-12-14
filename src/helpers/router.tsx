import { createBrowserRouter, Navigate } from 'react-router-dom'

import AppLayout from 'AppLayout'
import { ROUTES } from 'constants/routes'
import EarnOrdersHistory from 'pages/earn/EarnOrdersHistory'
import EarnPage from 'pages/earn/EarnPage'
import CreateTransactionPage from 'pages/investment-account/CreateTransactionPage'
import EditTransactionPage from 'pages/investment-account/EditTransactionPage'
import InvestmentAccountPage from 'pages/investment-account/InvestmentAccountPage'
import OverviewPage from 'pages/overview/OverviewPage'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '', element: <Navigate to={{ pathname: ROUTES.OVERVIEW }} /> },
      { path: ROUTES.OVERVIEW, element: <OverviewPage /> },
      { path: ROUTES.EARN, element: <EarnPage /> },
      { path: `${ROUTES.EARN_HISTORY}/:coin`, element: <EarnOrdersHistory /> },
      { path: ROUTES.INVESTMENT_ACCOUNT, element: <InvestmentAccountPage /> },
      { path: ROUTES.CREATE_TRANSACTION, element: <CreateTransactionPage /> },
      { path: `${ROUTES.EDIT_TRANSACTION}/:id`, element: <EditTransactionPage /> },
    ],
  },
])

export default router
