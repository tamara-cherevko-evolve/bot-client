import { useState } from 'react'

import { MoreVertical, Plus, Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ROUTES } from 'constants/routes'
import useDeleteAccountTransaction from 'hooks/queries/account/useDeleteAccountTransaction'
import useGetAllAccountTransactions from 'hooks/queries/account/useGetAllAccountTransactions'
import { AccountTransactionType } from 'interfaces/account/interface'
import { UAH, USD } from 'utils/currency'
import { formatDate } from 'utils/date'

import { TransactionTypeLabel } from './CreateTransactionPage'
import Layout from './Layout'

const getTransactionTypeColor = (type: AccountTransactionType) => {
  switch (type) {
    case AccountTransactionType.Credit:
      return 'text-green-500'
    case AccountTransactionType.Debit:
      return 'text-red-500'
    default:
      return 'text-white'
  }
}

const InvestmentAccountPage = () => {
  const navigate = useNavigate()
  const { data: transactions, isPending } = useGetAllAccountTransactions()
  const { mutateAsync: deleteTransaction, isPending: isDeleting } = useDeleteAccountTransaction()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null)
  const currentBalance = transactions?.[0]?.balance ?? 0

  const handleEdit = (transactionId: number) => {
    navigate(`${ROUTES.EDIT_TRANSACTION}/${transactionId}`)
  }

  const handleDeleteClick = (transactionId: number) => {
    setTransactionToDelete(transactionId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (transactionToDelete === null) return

    try {
      await deleteTransaction(transactionToDelete)
      setDeleteDialogOpen(false)
      setTransactionToDelete(null)
    } catch {
      // Error is handled by the hook's onError callback with toast notification
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setTransactionToDelete(null)
  }

  const transactionToDeleteData = transactions?.find((t) => t.id === transactionToDelete)

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Account</h1>
          <p className="mt-2 text-muted-foreground">View all your account transactions and activity</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <div className="text-2xl font-bold">{UAH(currentBalance)}</div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription className="!mt-3">All account transactions in chronological order</CardDescription>
              </div>
              <Button onClick={() => navigate(ROUTES.CREATE_TRANSACTION)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Transaction
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className="space-y-4">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-32" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="h-4 w-16 ml-auto" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="h-4 w-16 ml-auto" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-4" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : !transactions || transactions.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">No transactions found</div>
            ) : (
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatDate(transaction.transaction_date)}</TableCell>
                      <TableCell>
                        <span className={getTransactionTypeColor(transaction.transaction_type)}>
                          <TransactionTypeLabel type={transaction.transaction_type} />
                        </span>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell
                        className={`text-right font-medium ${getTransactionTypeColor(transaction.transaction_type)}`}
                      >
                        {transaction.transaction_type === AccountTransactionType.Credit ? '+' : '-'}
                        {USD(transaction.amount)}
                      </TableCell>
                      <TableCell className="text-right">{USD(transaction.balance)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(transaction.id)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(transaction.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the transaction
              {transactionToDeleteData && (
                <>
                  {' '}
                  from {formatDate(transactionToDeleteData.transaction_date)} with amount{' '}
                  {USD(transactionToDeleteData.amount)}.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel} disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  )
}

export default InvestmentAccountPage
