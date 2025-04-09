import { ReactNode } from 'react'

import { BalanceStatus } from 'pages-components'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-8 pt-0">
      {/* <BalanceStatus /> */}
      {children}
    </div>
  )
}

export default Layout
