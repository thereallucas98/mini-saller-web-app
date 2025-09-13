import { AlertTriangle, RefreshCw } from 'lucide-react'

import { Button } from './button'

interface ErrorStateProps {
  title?: string
  description: string
  onRetry?: () => void
  className?: string
}

export const ErrorState = ({
  title = 'Something went wrong',
  description,
  onRetry,
  className = '',
}: ErrorStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 text-center ${className}`}
    >
      <div className="bg-destructive/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-6 text-base-gray-400">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}
