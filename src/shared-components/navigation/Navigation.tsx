import { NavLink } from 'react-router-dom'

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { ROUTES } from 'constants/routes'
import { Logo } from 'shared-components'

const navigationMenu = [
  {
    name: 'Earn',
    href: ROUTES.EARN,
  },
  {
    name: 'Trading',
    href: ROUTES.TRADING,
  },
]
const Navigation = () => {
  const activeClassName = 'text-primary'
  const inactiveClassName = 'text-white hover:text-gray-400'

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex px-8 py-4 space-x-6">
        <NavigationMenuItem>
          <NavLink to={ROUTES.HOME}>
            <Logo />
          </NavLink>
        </NavigationMenuItem>
        {navigationMenu.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavLink to={item.href} className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}>
              {item.name}
            </NavLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navigation
