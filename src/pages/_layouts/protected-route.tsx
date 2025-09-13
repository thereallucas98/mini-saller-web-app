import { Loader } from 'lucide-react'
import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '~/contexts/auth-context'

interface ProtectedRouteProps {
  element: ReactElement
}

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <Loader />
  }

  return user ? element : <Navigate to="/login" replace />
}
