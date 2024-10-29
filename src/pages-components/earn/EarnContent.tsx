import { Skeleton } from '@/components/ui/skeleton'
import useGetEarnData from 'hooks/queries/earn/useGetEarnData'
import EarnDataTable from 'pages-components/earn/EarnDataTable'
import { ErrorAlert } from 'shared-components'

interface EarnContentProps {
  coin: string
}

const EarnContent = ({ coin }: EarnContentProps) => {
  const { data: earnData, isPending, isError, error } = useGetEarnData(coin)

  if (isPending)
    return (
      <div className="mt-4 space-y-4">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
      </div>
    )
  if (isError) return <ErrorAlert error={error} />
  if (!earnData?.length) return <div>No Data</div>

  return <EarnDataTable data={earnData || []} coin={coin} />
}

export default EarnContent
