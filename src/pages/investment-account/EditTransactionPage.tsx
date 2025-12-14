import { useEffect } from 'react'

import { startCase } from 'lodash'
import { useForm, Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { ROUTES } from 'constants/routes'
import useGetAllAccountTransactions from 'hooks/queries/account/useGetAllAccountTransactions'
import useUpdateAccountTransaction from 'hooks/queries/account/useUpdateAccountTransaction'
import { AccountTransactionType } from 'interfaces/account/interface'

import { transactionTypeBackground, transactionTypeIcon } from './CreateTransactionPage'
import Layout from './Layout'

interface EditTransactionForm {
  type: AccountTransactionType
  description: string
  amount: string
  date: string
}

const TransactionTypeLabel = ({ type, className }: { type: AccountTransactionType; className?: string }) => {
  const IconComponent = transactionTypeIcon[type]
  const backgroundClass = transactionTypeBackground[type]

  return (
    <div
      className={cn(
        'flex  items-center h-[1.5rem] rounded-md text-sm text-white pl-2 pr-4 w-20',
        backgroundClass,
        className
      )}
    >
      <IconComponent className="w-3 h-3 mr-1 opacity-75 shrink-0" strokeWidth={2} />
      <div className="flex-1 leading-none">{startCase(type)}</div>
    </div>
  )
}

const EditTransactionPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: transactions, isPending: isLoadingTransactions } = useGetAllAccountTransactions()
  const { mutateAsync: updateTransaction, isPending } = useUpdateAccountTransaction()

  const transaction = transactions?.find((t) => t.id === Number.parseInt(id || '0'))

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditTransactionForm>({
    defaultValues: {
      type: AccountTransactionType.Debit,
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
    },
  })

  useEffect(() => {
    if (transaction) {
      reset({
        type: transaction.transaction_type,
        description: transaction.description,
        amount: transaction.amount.toString(),
        date:
          transaction.transaction_date instanceof Date
            ? transaction.transaction_date.toISOString().split('T')[0]
            : new Date(transaction.transaction_date).toISOString().split('T')[0],
      })
    }
  }, [transaction, reset])

  const onSubmit = async (data: EditTransactionForm) => {
    if (!id) return

    try {
      await updateTransaction({
        id: Number.parseInt(id),
        ...data,
      })
      navigate(ROUTES.INVESTMENT_ACCOUNT)
    } catch {
      // Error is handled by the hook's onError callback with toast notification
    }
  }

  const handleCancel = () => {
    navigate(ROUTES.INVESTMENT_ACCOUNT)
  }

  if (isLoadingTransactions) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  if (!transaction) {
    return (
      <Layout>
        <div>Transaction not found</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Link to={ROUTES.INVESTMENT_ACCOUNT}>
        <Button variant="link" className="mb-4 -ml-4">{`< All transactions`}</Button>
      </Link>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Transaction</h1>
        <p className="mt-2 text-muted-foreground">Update transaction details</p>
      </div>

      <Card className="w-full mt-8 py-8">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Transaction Type
              </label>
              <Controller
                name="type"
                control={control}
                rules={{ required: 'Transaction type is required' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="type" className="w-full bg-white text-black border-gray-300">
                      <SelectValue placeholder="Select transaction type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={AccountTransactionType.Credit}>
                        <TransactionTypeLabel type={AccountTransactionType.Credit} />
                      </SelectItem>
                      <SelectItem value={AccountTransactionType.Debit}>
                        <TransactionTypeLabel type={AccountTransactionType.Debit} />
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount
              </label>
              <div className="flex items-center gap-2">
                <Controller
                  name="amount"
                  control={control}
                  rules={{
                    required: 'Amount is required',
                    min: { value: 0.01, message: 'Amount must be greater than 0' },
                  }}
                  render={({ field }) => (
                    <NumericFormat
                      id="amount"
                      decimalScale={2}
                      fixedDecimalScale
                      thousandSeparator
                      className="w-full p-2 text-black rounded-sm border border-gray-300"
                      placeholder="0.00"
                      {...field}
                    />
                  )}
                />
                <span className="text-sm text-muted-foreground">грн.</span>
              </div>
              {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <Controller
                name="date"
                control={control}
                rules={{ required: 'Date is required' }}
                render={({ field }) => (
                  <input
                    id="date"
                    type="date"
                    {...field}
                    className="w-full p-2 text-black rounded-sm border border-gray-300"
                  />
                )}
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <textarea
                    id="description"
                    {...field}
                    rows={4}
                    className="w-full p-2 text-black rounded-sm border border-gray-300 resize-none"
                    placeholder="Enter transaction description"
                  />
                )}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Updating...' : 'Update Transaction'}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isPending}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Layout>
  )
}

export default EditTransactionPage
