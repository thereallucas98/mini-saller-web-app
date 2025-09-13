import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '~/pages/_layouts/app'
import { ProtectedRoute } from '~/pages/_layouts/protected-route'
import { NotFoundPage } from '~/pages/404'

import { LoginPage } from '../pages/auth/login'
import { DashboardPage } from '../pages/dashboard'
import { LeadsPage } from '../pages/leads'
import { OpportunitiesPage } from '../pages/opportunities'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute element={<DashboardPage />} />,
      },
      {
        path: '/leads',
        element: <ProtectedRoute element={<LeadsPage />} />,
      },
      {
        path: '/opportunities',
        element: <ProtectedRoute element={<OpportunitiesPage />} />,
      },
    ],
  },
])
