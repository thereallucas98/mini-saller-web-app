import { LucideIcon } from 'lucide-react'

import { Button } from './button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 text-center ${className}`}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background-secondary">
        <Icon className="h-8 w-8 text-base-gray-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-6 text-base-gray-400">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  )
}
