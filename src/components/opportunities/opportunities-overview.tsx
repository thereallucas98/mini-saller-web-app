import { CheckCircle, DollarSign, Target, TrendingUp } from 'lucide-react'
import { useMemo } from 'react'

import { useOpportunities } from '~/contexts/opportunities-provider'

import { Card, CardContent } from '../ui/card'

export const OpportunitiesOverview = () => {
  const { opportunities } = useOpportunities()

  const stats = useMemo(() => {
    const total = opportunities.length
    const won = opportunities.filter((o) => o.stage === 'Closed Won').length
    const totalValue = opportunities.reduce(
      (sum, o) => sum + (o.amount || 0),
      0,
    )
    const winRate = total > 0 ? Math.round((won / total) * 100) : 0

    return {
      total,
      won,
      totalValue,
      winRate,
    }
  }, [opportunities])

  const overviewItems = useMemo(
    () => [
      {
        label: 'Total Opportunities',
        value: stats.total,
        icon: Target,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
      },
      {
        label: 'Won Deals',
        value: stats.won,
        icon: CheckCircle,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
      },
      {
        label: 'Total Value',
        value: `$${stats.totalValue.toLocaleString()}`,
        icon: DollarSign,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
      },
      {
        label: 'Win Rate',
        value: `${stats.winRate}%`,
        icon: TrendingUp,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
      },
    ],
    [stats],
  )

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20"></div>
      <CardContent className="relative p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Opportunities Overview
          </h2>
          <p className="text-sm text-base-gray-400 sm:text-base">
            Track your sales pipeline performance
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
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
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-sm font-bold sm:text-lg lg:text-xl ${item.color} truncate`}
                    >
                      {item.value}
                    </div>
                    <div className="truncate text-xs text-base-gray-300 sm:text-sm">
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
