import { FileQuestion } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { EmptyState } from '~/components/ui/empty-state'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <EmptyState
        icon={FileQuestion}
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist."
        action={{
          label: 'Go Home',
          onClick: () => navigate('/'),
        }}
      />
    </div>
  )
}
