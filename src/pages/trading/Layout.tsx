import { ReactNode } from 'react'

import { BalanceStatus } from 'pages-components'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <BalanceStatus />
      {children}
    </div>
  )
}

export default Layout
