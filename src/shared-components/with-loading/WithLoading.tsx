import { cn } from 'utils/cn'

interface WithLoadingProps {
  className?: string
  isLoading: boolean
  children?: React.ReactNode
  transparent?: boolean
}

const WithLoading = ({ isLoading, children, className, transparent }: WithLoadingProps) => {
  const bgColor = transparent ? 'transparent' : 'bg-gray-50'

  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 grid place-content-center">
          <div className={cn(bgColor, 'absolute top-0 bottom-0 left-0 right-0 opacity-40')} />
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          />
        </div>
      )}
    </div>
  )
}

export default WithLoading
