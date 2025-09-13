import { LayoutDashboard, UserPlus, Users } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { ActionsDropdown } from './actions-dropdown'

interface NavItemProps {
  to: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}

function NavItem({ to, icon: Icon, label }: NavItemProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center space-y-1 px-4 py-3 transition-colors ${
        isActive
          ? 'bg-primary/10 rounded-lg text-primary'
          : 'rounded-lg text-base-gray-300 hover:bg-background-secondary hover:text-foreground'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-medium">{label}</span>
    </Link>
  )
}

export function BottomNav() {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/opportunities', icon: Users, label: 'Work Mgmt' },
    { to: '/leads', icon: UserPlus, label: 'Leads' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background-primary md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
        {/* Actions Dropdown */}
        <div className="flex flex-col items-center justify-center space-y-1 px-4 py-3">
          <ActionsDropdown />
        </div>
      </div>
    </nav>
  )
}
