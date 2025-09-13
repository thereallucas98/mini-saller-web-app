import {
  Bell,
  Calendar,
  LayoutDashboard,
  LogOut,
  Mail,
  Users,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { useAuth } from '~/contexts/auth-context'

import { Button } from '../ui/button'

export function TopNav() {
  const location = useLocation()
  const { logout } = useAuth()

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/opportunities', icon: Users, label: 'Opportunities' },
    { to: '/leads', icon: Users, label: 'Leads' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden w-full border-b border-border bg-background-primary lg:block">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary"></div>
                <span className="text-xl font-bold text-foreground">
                  Mini Seller
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.to)
                      ? 'text-primary'
                      : 'text-base-gray-300 hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Actions - Individual icons in desktop */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-base-gray-300 hover:text-foreground"
              >
                <Calendar className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-base-gray-300 hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-base-gray-300 hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-base-gray-300 hover:text-foreground"
                onClick={logout}
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Header - Only Logo */}
      <header className="border-b border-border bg-background-primary lg:hidden">
        <div className="flex h-14 items-center justify-center px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-primary"></div>
            <span className="text-lg font-bold text-foreground">
              Mini Seller
            </span>
          </Link>
        </div>
      </header>
    </>
  )
}
