import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ErrorAlertProps {
  error: Error
  title?: string
}

const ErrorAlert = ({ error, title }: ErrorAlertProps) => {
  if (!error?.message) return null

  return (
    <Alert variant="destructive">
      <AlertCircle className="w-4 h-4" />
      <AlertTitle>{title || 'Error'}</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  )
}

export default ErrorAlert
