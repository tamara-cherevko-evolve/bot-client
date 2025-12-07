import { useState } from 'react'

import axios from 'axios'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'
import useGetTradingInfo from 'hooks/queries/trading/useGetTradingInfo'
import useGetTradingOrders from 'hooks/queries/trading/useGetTradingOrders'
import useStartStrategy from 'hooks/queries/trading/useStartrTradingStrategy'
import useStartrTradingStrategy from 'hooks/queries/trading/useStartrTradingStrategy'
import useUpdateTredingInfo from 'hooks/queries/trading/useUpdateTredingInfo'
import useGetBalance from 'hooks/queries/useGetBalance'
import useDialogOpen from 'hooks/useDialogOpen'
import { ErrorResponse } from 'interfaces/common/interface'
import { IOrder, IOrdersData } from 'interfaces/orders/interface'
import { TradingInfoToUpdate } from 'interfaces/trading/interface'
import TradingInfo from 'pages-components/trading/TradingInfo'
import UpdateTradingInfoDialog from 'pages-components/trading/UpdateTradingInfoDialog'
import DisconnectedMessage from 'shared-components/DisconnectedMessage'
import OrdersTable from 'shared-components/OrdersTable'
import StatisticTable from 'shared-components/StatisticTable'
import { cn } from 'utils/cn'
import { USD } from 'utils/currency'

import Layout from './Layout'

const DEFAULT_COIN = 'BTC'
const DEFAULT_COIN_ID = 1

const TradingPage = () => {
  const [connectionError, setConnectionError] = useState<Event | null>(null)
  const [isRecalculatingSellOrder, setIsRecalculatingSellOrder] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false)
  const [ordersData, setOrdersData] = useState<IOrdersData | null>(null)
  const { data: tradingInfo, isLoading: isTradingInfoLoading } = useGetTradingInfo(DEFAULT_COIN_ID)
  const { isLoading: isBalanceLoading, data: balance } = useGetBalance()
  const { mutateAsync: updateTradingInfo } = useUpdateTredingInfo()
  const { data: orders, isLoading: isOrdersLoading } = useGetTradingOrders(DEFAULT_COIN_ID)
  const { mutateAsync: startTradingStrategy, isPending: isLoadingTradingStrategy } = useStartrTradingStrategy()
  const {
    state: tradingInfoToUpdate,
    isOpen: isUpdateTradingInfoDialogOpen,
    openDialog: openUpdateTradingInfoDialog,
    closeDialog: closeUpdateTradingInfoDialog,
  } = useDialogOpen<TradingInfoToUpdate | null>(null)

  const canStartStrategy =
    !isLoadingTradingStrategy &&
    !isTradingInfoLoading &&
    !isBalanceLoading &&
    !!tradingInfo &&
    !!balance &&
    tradingInfo.estimated_investment > balance

  const handleStartStrategy = async () => {
    try {
      await startTradingStrategy({ coin: DEFAULT_COIN_ID })
      toast({
        title: 'Success!',
        description: `You have successfully started a round for ${DEFAULT_COIN}!`,
        duration: 10000,
      })
    } catch (error) {
      toast({
        title: 'Oops... ERROR!',
        description: (error as ErrorResponse)?.response?.data?.message,
        variant: 'destructive',
        duration: 60000,
      })
    }
  }

  const handleChangeQauntity = () => {
    openUpdateTradingInfoDialog({
      quantity: tradingInfo?.quantity || 0,
      max_percent_down: tradingInfo?.max_percent_down || 0,
    })
  }

  const handleConfirmUpdateTradingInfo = async (data: TradingInfoToUpdate) => {
    try {
      await updateTradingInfo({ coin: DEFAULT_COIN_ID, tradingInfo: data })

      toast({
        title: 'Success!',
        description: `You have successfully updated trading info for ${DEFAULT_COIN}!`,
        duration: 10000,
      })
    } catch (error) {
      toast({
        title: 'Oops... ERROR!',
        description: (error as ErrorResponse)?.response?.data?.message,
        variant: 'destructive',
        duration: 60000,
      })
    }
  }

  const recalculateSellOrderHandler = async () => {
    setIsRecalculatingSellOrder(true)
    try {
      await axios.post('https://python-bot-ct2n.onrender.com/recalculate-sell-order', {
        method: 'POST',
      })
      setIsRecalculatingSellOrder(false)
    } catch (error) {
      console.log(error)
      setIsRecalculatingSellOrder(false)
    }
  }

  const openSocket = async () => {
    const socket = new WebSocket('ws://localhost:8765')

    // Connection opened
    socket.onopen = function (event) {
      setConnectionError(null)
      setConnectionStatus(true)
      console.log('Connection opened', event)
    }

    // Listen for messages
    socket.onmessage = function (event) {
      setOrdersData(JSON.parse(event.data))
      console.log(JSON.parse(event.data))
    }

    // Listen for possible errors
    socket.onerror = function (error) {
      setConnectionError(error)
      setConnectionStatus(false)
      console.error('WebSocket Error', error)
    }

    // Connection closed
    socket.onclose = function (event) {
      setConnectionError(event)
      setConnectionStatus(false)
      console.log('Connection closed', event)
    }
  }

  return (
    <Layout>
      <div className="h-full App">
        <div className="flex justify-end gap-5 mt-4 mb-8">
          <Badge
            variant="default"
            className={`${connectionStatus ? 'bg-green-500' : 'bg-gray-500'} text-white p-2 px-4`}
          >
            {connectionStatus ? 'Connected to server' : 'Disconnected from server'}
          </Badge>
        </div>
        <Card className={cn('p-6 h-[240px]')}>
          <p className="mb-4 text-gray-300">Current investment strategy</p>
          {(isTradingInfoLoading || isBalanceLoading) && (
            <>
              <Skeleton className="w-64 h-6 mt-1" />
              <Skeleton className="w-64 h-6 mt-2" />
              <Skeleton className="w-64 h-6 mt-2" />
              <Skeleton className="w-40 h-9 mt-3" />
            </>
          )}
          {!!tradingInfo && !!balance && (
            <>
              <div className="flex gap-2">
                <p>Quantity: {tradingInfo.quantity}</p>
                <Button
                  variant="link"
                  className="h-6 p-0"
                  onClick={handleChangeQauntity}
                  disabled={isLoadingTradingStrategy}
                >
                  Change
                </Button>
              </div>
              <div className="flex gap-2">
                <p>Max percent down: {tradingInfo.max_percent_down}%</p>
                <Button
                  variant="link"
                  className="h-6 p-0"
                  onClick={handleChangeQauntity}
                  disabled={isLoadingTradingStrategy}
                >
                  Change
                </Button>
              </div>
              <p className={cn('flex space-x-2')}>
                <span>Estimated balance:</span>
                <span>{USD(tradingInfo.estimated_investment)}</span>
              </p>
              <div className="flex gap-2">
                <p className={cn('flex space-x-2')}>
                  <span>Existing balance:</span>
                  <span className={balance < tradingInfo.estimated_investment ? 'text-red-500' : ''}>
                    {USD(balance)}
                  </span>
                </p>
                <Button
                  variant="link"
                  className="h-6 p-0"
                  disabled={isLoadingTradingStrategy}
                  onClick={() => window.open('https://p2p.binance.com/uk-UA', '_blank')}
                >
                  Refill balance
                </Button>
              </div>
              <Button onClick={handleStartStrategy} disabled={canStartStrategy} className="w-40 mt-4">
                {isLoadingTradingStrategy ? 'Loading...' : 'Start Strategy'}
              </Button>
            </>
          )}
        </Card>
        <TradingInfo className="my-8" />
        <div className="flex gap-10 mt-5">
          <div className="basis-1/2">
            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle className="text-white">
                  Filled Orders
                  {connectionStatus ? ` (${ordersData?.completed_orders?.length || 0})` : ''}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isOrdersLoading && (
                  <div className="flex space-x-8">
                    <Skeleton className="h-[200px] flex-1 rounded-xl" />
                    <Skeleton className="h-[200px] flex-1 rounded-xl" />
                    <Skeleton className="h-[200px] flex-1 rounded-xl" />
                    <Skeleton className="h-[200px] flex-1 rounded-xl" />
                  </div>
                )}
                {!!orders?.filled?.length && (
                  <StatisticTable
                    orders={orders.filled || []}
                    averagePrice={ordersData?.average_price}
                    totalQuantity={ordersData?.total_quantity}
                    tpPrice={ordersData?.tp_price}
                    expectedProfit={ordersData?.expected_profit}
                    totalSpent={ordersData?.total_spent}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          <div className="basis-1/2">
            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle className="text-white">
                  Open Orders
                  {connectionStatus
                    ? ` (${ordersData?.orders_are_listening?.length ? ordersData.orders_are_listening.length - 1 : 0})`
                    : ''}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {connectionStatus && ordersData && (
                  <>
                    <Alert className="mb-2" variant={connectionStatus ? 'default' : 'destructive'}>
                      <AlertTitle className={`text-lg font-bold ${connectionStatus ? 'text-emerald-800' : 'initial'}`}>
                        {parseFloat(ordersData?.current_price).toFixed(2)}
                      </AlertTitle>
                      <AlertDescription>Last update: {ordersData?.last_update?.toLocaleString()}</AlertDescription>
                    </Alert>
                    <OrdersTable orders={(ordersData?.orders_are_listening as IOrder[]) || []} />
                  </>
                )}
                {connectionStatus && !ordersData && (
                  <div className="flex flex-col space-y-8">
                    <Skeleton className="h-[100px] w-full rounded-xl" />
                    <div className="space-y-4">
                      <Skeleton className="w-full h-[50px]" />
                      <Skeleton className="w-full h-[50px]" />
                      <Skeleton className="w-full h-[50px]" />
                      <Skeleton className="w-full h-[50px]" />
                    </div>
                  </div>
                )}
                {!connectionStatus && <DisconnectedMessage />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {isUpdateTradingInfoDialogOpen && (
        <UpdateTradingInfoDialog
          coinId={DEFAULT_COIN_ID}
          open={isUpdateTradingInfoDialogOpen}
          onClose={closeUpdateTradingInfoDialog}
          onConfirm={handleConfirmUpdateTradingInfo}
          defaultValues={tradingInfoToUpdate || undefined}
        />
      )}
    </Layout>
  )
}

export default TradingPage
