import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from './contexts/auth-context'
import { OpportunitiesProvider } from './contexts/opportunities-provider'
import { router } from './router'

function App() {
  return (
    <AuthProvider>
      <OpportunitiesProvider>
        <RouterProvider router={router} />
      </OpportunitiesProvider>
    </AuthProvider>
  )
}

export default App
