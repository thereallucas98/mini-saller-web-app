import { Bell, Calendar, LogOut, Mail, MoreVertical } from 'lucide-react'

import { useAuth } from '~/contexts/auth-context'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function ActionsDropdown() {
  const { logout } = useAuth()

  const actions = [
    {
      icon: Calendar,
      label: 'Calendar',
      onClick: () => {
        console.log('Calendar clicked')
      },
    },
    {
      icon: Bell,
      label: 'Notifications',
      onClick: () => {
        console.log('Notifications clicked')
      },
    },
    {
      icon: Mail,
      label: 'Messages',
      onClick: () => {
        console.log('Messages clicked')
      },
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col items-center justify-center space-y-1 text-base-gray-300 transition-colors hover:text-foreground">
          <MoreVertical className="h-5 w-5" />
          <span className="text-xs font-medium">More</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" side="top" className="mb-2 w-48">
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className="flex items-center space-x-3"
          >
            <action.icon className="h-4 w-4" />
            <span>{action.label}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="flex items-center space-x-3 text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
