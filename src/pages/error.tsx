import { ErrorState } from '~/components/ui/error-state'

export function Error() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background-primary">
      <ErrorState
        title="Something went wrong"
        description="An unexpected error occurred. Please try again later."
        onRetry={() => window.location.reload()}
      />
    </div>
  )
}
