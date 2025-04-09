import { ErrorBoundary } from 'react-error-boundary'

import { ErrorAlert } from 'shared-components'

function fallbackRender({ error, errorText }: { error: Error; errorText?: string }) {
  return <ErrorAlert error={error} title={errorText} />
}

const ErrorBoundaryComponent = ({ children, errorText }: { children: React.ReactNode; errorText?: string }) => {
  return <ErrorBoundary fallbackRender={(props) => fallbackRender({ ...props, errorText })}>{children}</ErrorBoundary>
}

export default ErrorBoundaryComponent
