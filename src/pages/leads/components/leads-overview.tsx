import { TrendingUp, UserCheck, UserPlus, Users, UserX } from 'lucide-react'
import { useMemo } from 'react'

import { Card, CardContent } from '~/components/ui/card'
import { useLeadsOverview } from '~/hooks/use-leads-overview'

export const LeadsOverview = () => {
  const { overview, loading } = useLeadsOverview()

  const overviewItems = useMemo(
    () => [
      {
        label: 'Total Leads',
        value: overview.total,
        icon: Users,
        color: 'text-primary',
        bgColor: 'bg-primary/10',
      },
      {
        label: 'New',
        value: overview.new,
        icon: UserPlus,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
      },
      {
        label: 'Contacted',
        value: overview.contacted,
        icon: TrendingUp,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
      },
      {
        label: 'Qualified',
        value: overview.qualified,
        icon: UserCheck,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
      },
      {
        label: 'Unqualified',
        value: overview.unqualified,
        icon: UserX,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
      },
    ],
    [overview],
  )

  return (
    <Card className="relative overflow-hidden">
      <div className="from-primary/20 absolute inset-0 bg-gradient-to-r to-purple-600/20"></div>
      <CardContent className="relative p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Leads Overview</h2>
          <p className="text-base-gray-400">Current status of all leads</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {overviewItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className={`rounded-lg p-3 sm:p-4 ${item.bgColor} transition-all hover:scale-105`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`rounded-full p-1.5 sm:p-2 ${item.bgColor}`}>
                    <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <div
                      className={`text-lg font-bold sm:text-xl lg:text-2xl ${item.color}`}
                    >
                      {loading ? '...' : item.value}
                    </div>
                    <div className="text-xs text-base-gray-300 sm:text-sm">
                      {item.label}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
