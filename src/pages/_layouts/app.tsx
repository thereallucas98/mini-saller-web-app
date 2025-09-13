import { Outlet } from 'react-router-dom'

import { BottomNav } from '~/components/layout/bottom-nav'
import { TopNav } from '~/components/layout/top-nav'

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background-primary antialiased">
      <TopNav />
      <div className="flex w-full flex-1 flex-col items-center pb-20">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}
