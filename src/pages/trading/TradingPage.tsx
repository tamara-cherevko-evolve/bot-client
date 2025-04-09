import { useState } from 'react'

import axios from 'axios'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ReactComponent as BinanceLogo } from 'assets/images/binanceLogo.svg'
import useGetTradingInfo from 'hooks/queries/trading/useGetTradingInfo'
import { IOrder, IOrdersData } from 'interfaces/orders/interface'
import DisconnectedMessage from 'shared-components/DisconnectedMessage'
import OrdersTable from 'shared-components/OrdersTable'
import StatisticTable from 'shared-components/StatisticTable'
import { cn } from 'utils/cn'
import { USD } from 'utils/currency'

import Layout from './Layout'

const TradingPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [connectionError, setConnectionError] = useState<Event | null>(null)
  const [isRecalculatingSellOrder, setIsRecalculatingSellOrder] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false)
  const [ordersData, setOrdersData] = useState<IOrdersData | null>(null)
  const { data: tradingInfo, isLoading: isTradingInfoLoading } = useGetTradingInfo(1)

  // useEffect(() => {
  //   axios.get(`${BASE_URL}/get-balance`);
  //   if (!connectionStatus) {
  //     openSocket();
  //   }
  // }, []);

  const startHandler = async () => {
    setIsLoading(true)
    // try {
    //   await axios.get(`${BASE_URL}/start-dca-grid`);
    //   setIsLoading(false);
    // } catch (error) {
    //   console.log(error);
    //   setIsLoading(false);
    // }
  }

  const handleChangeQauntity = () => {
    // Handle change quantity logic here
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
        <Card className={cn('p-6 min-h-48')}>
          <p className="mb-4 text-gray-300">Current Investment stratege</p>
          {isTradingInfoLoading && (
            <>
              <Skeleton className="w-64 h-6 mt-1" />
              <Skeleton className="w-64 h-6 mt-2" />
              <Skeleton className="w-40 h-9 mt-3" />
            </>
          )}
          {!!tradingInfo && (
            <>
              <div className="flex gap-4">
                <p>Quantity: {tradingInfo.quantity}</p>
                <Button variant="link" className="h-6 p-0" onClick={() => handleChangeQauntity} disabled={isLoading}>
                  Change
                </Button>
              </div>
              <div className="flex gap-4">
                <p className={cn('flex space-x-2')}>
                  <span>Estimated balance:</span>
                  <span>{USD(244)}</span>
                </p>
                <Button
                  variant="link"
                  className="h-6 p-0"
                  onClick={() => window.open('https://p2p.binance.com/uk-UA', '_blank')}
                >
                  Refill balance
                </Button>
              </div>
              <Button
                onClick={startHandler}
                disabled={isLoading || !!ordersData?.orders_are_listening?.length}
                className="w-40 mt-4"
              >
                {isLoading ? 'Loading...' : 'Start DCA Grid'}
              </Button>
            </>
          )}
        </Card>

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
                {!connectionStatus && <DisconnectedMessage />}
                {connectionStatus && !ordersData && (
                  <div className="flex space-x-8">
                    <Skeleton className="h-[200px] flex-1 rounded-xl" />
                    <Skeleton className="h-[200px] flex-1 rounded-xl" />
                    <Skeleton className="h-[200px] flex-1 rounded-xl" />
                    <Skeleton className="h-[200px] flex-1 rounded-xl" />
                  </div>
                )}
                {connectionStatus && ordersData && (
                  <StatisticTable
                    orders={ordersData?.completed_orders || []}
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
    </Layout>
  )
}

export default TradingPage
