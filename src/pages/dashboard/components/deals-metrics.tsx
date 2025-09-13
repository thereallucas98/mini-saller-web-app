import { ChartArea, DollarSign } from 'lucide-react'

import { Card, CardContent } from '~/components/ui/card'
import { getDealMetrics } from '~/data/dashboard-data'

export const DealsMetrics = () => {
  const dealMetrics = getDealMetrics()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card className="bg-accent-purple text-primary-foreground shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1 text-sm font-medium opacity-90 sm:mb-2 sm:text-lg">
                Deals This Year
              </h3>
              <div className="text-2xl font-bold sm:text-3xl">
                {dealMetrics.thisYearFormatted}
              </div>
              <div className="mt-1 text-xs opacity-75 sm:mt-2 sm:text-sm">
                {dealMetrics.totalDealsFormatted} total deals
              </div>
            </div>
            <ChartArea className="h-10 w-10 text-white" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-success-green text-white shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1 text-sm font-medium opacity-90 sm:mb-2 sm:text-lg">
                Deals This Month
              </h3>
              <div className="text-2xl font-bold sm:text-3xl">
                {dealMetrics.thisMonthFormatted}
              </div>
              <div className="mt-1 text-xs opacity-75 sm:mt-2 sm:text-sm">
                {dealMetrics.wonDealsFormatted} won deals
              </div>
            </div>
            <DollarSign className="h-10 w-10 text-white" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
