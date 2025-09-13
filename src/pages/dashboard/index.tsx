import {
  companies,
  contacts,
  deals,
  recentActivity,
} from '~/data/dashboard-data'

import { DealsMetrics } from './components/deals-metrics'
import { ListCard } from './components/list-card'
import { OpportunitiesOverview } from './components/opportunities-overview'
import { TasksOverview } from './components/tasks-overview'

export const DashboardPage = () => {
  return (
    <div className="w-full max-w-[1440px] space-y-4 p-4 sm:space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Dashboard
        </h1>
      </div>

      {/* Tasks Overview */}
      <TasksOverview />

      {/* Deals Metrics */}
      <DealsMetrics />

      {/* Opportunities Overview */}
      <OpportunitiesOverview />

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="sm:col-span-2 lg:col-span-1">
          <ListCard
            title="Recent Activity"
            items={recentActivity}
            type="activity"
          />
        </div>

        {/* Contacts */}
        <ListCard title="Contacts" items={contacts} type="contact" />

        {/* Companies */}
        <ListCard title="Companies" items={companies} type="company" />
      </div>

      {/* Deals */}
      <ListCard title="Deals" items={deals} type="deal" />
    </div>
  )
}
