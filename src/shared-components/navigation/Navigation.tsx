import { Wallet } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { ROUTES } from 'constants/routes'

const navigationMenu = [
  { name: 'Overview', href: ROUTES.OVERVIEW },
  { name: 'Крипта', href: ROUTES.EARN },
  { name: 'Blago Invest', href: ROUTES.BLAGO_INVEST },
]
const Navigation = () => {
  const activeClassName = 'text-primary'
  const inactiveClassName = 'text-white hover:text-gray-400'

  return (
    <div className="flex justify-between items-center mb-4 mt-2">
      <NavigationMenu className="w-full flex items-center justify-between px-8 py-4">
        <NavigationMenuList className="flex items-center gap-4">
          {navigationMenu.map((item) => (
            <NavigationMenuItem key={item.name}>
              <NavLink to={item.href} className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}>
                {item.name}
              </NavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <NavLink
        to={ROUTES.INVESTMENT_ACCOUNT}
        className={({ isActive }) => `mr-8 ${isActive ? activeClassName : inactiveClassName}`}
      >
        <Wallet className="w-6 h-6" />
      </NavLink>
    </div>
  )
}

export default Navigation
