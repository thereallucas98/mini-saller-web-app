import { ChartArea, DollarSign, TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart'
import {
  companies,
  contacts,
  deals,
  getDealMetrics,
  getTaskMetrics,
  recentActivity,
} from '~/data/dashboard-data'

export const DashboardPage = () => {
  // Get dynamic metrics
  const tasksData = getTaskMetrics()
  const dealMetrics = getDealMetrics()

  // Chart data for opportunities overview
  const chartData = [
    { month: 'January', opportunities: 12, deals: 8 },
    { month: 'February', opportunities: 19, deals: 15 },
    { month: 'March', opportunities: 15, deals: 12 },
    { month: 'April', opportunities: 22, deals: 18 },
    { month: 'May', opportunities: 18, deals: 14 },
    { month: 'June', opportunities: 25, deals: 20 },
  ]

  const chartConfig = {
    opportunities: {
      label: 'Opportunities',
      color: 'oklch(47.4% 0.2 300)',
    },
    deals: {
      label: 'Deals',
      color: 'oklch(66.5% 0.16 313.1)',
    },
  } satisfies ChartConfig

  return (
    <div className="w-full max-w-[1440px] space-y-4 p-4 sm:space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Dashboard
        </h1>
      </div>

      {/* Tasks Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Tasks Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tasksData.map((task) => (
              <div
                key={task.label}
                className="flex items-center justify-between rounded-lg bg-background-secondary p-4 transition-colors hover:bg-background-tertiary"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-4 w-4 rounded-full ${task.color} shadow-sm`}
                  ></div>
                  <div>
                    <div className="text-sm font-medium text-base-gray-300">
                      {task.label}
                    </div>
                    <div className="text-xs text-base-gray-400">Tasks</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground sm:text-3xl">
                    {task.count.toLocaleString()}
                  </div>
                  <div className="text-xs text-base-gray-400">
                    {task.label === 'Completed'
                      ? 'Success'
                      : task.label === 'Dropped'
                        ? 'Failed'
                        : 'Active'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deals Cards */}
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

      {/* Opportunities Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">
            Opportunities Overview
          </CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="opportunities"
                fill="var(--color-opportunities)"
                radius={4}
              />
              <Bar dataKey="deals" fill="var(--color-deals)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none text-success-green">
            Trending up by 8.3% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-base-gray-400">
            Showing opportunities and deals for the last 6 months
          </div>
        </CardFooter>
      </Card>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold text-foreground sm:text-base">
              Recent Activity
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.slice(0, 3).map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background-tertiary sm:h-8 sm:w-8">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary sm:h-2 sm:w-2"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-foreground sm:text-sm">
                      {activity.description}
                    </p>
                    <div className="mt-1 flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                      <Badge variant="outline" className="w-fit text-xs">
                        {activity.action}
                      </Badge>
                      <span className="text-xs text-base-gray-400">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contacts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold text-foreground sm:text-base">
              Contacts
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contacts.slice(0, 3).map((contact, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground sm:h-8 sm:w-8 sm:text-sm">
                    {contact.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground sm:text-sm">
                      {contact.name}
                    </p>
                    <p className="truncate text-xs text-base-gray-400">
                      {contact.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Companies */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold text-foreground sm:text-base">
              Companies
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {companies.slice(0, 3).map((company, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground sm:h-8 sm:w-8 sm:text-sm">
                    {company.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground sm:text-sm">
                      {company.name}
                    </p>
                    <p className="truncate text-xs text-base-gray-400">
                      {company.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground sm:text-base">
            Deals
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {deals.slice(0, 3).map((deal, index) => (
              <div
                key={index}
                className="flex flex-col space-y-3 rounded-lg bg-background-secondary p-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground sm:h-8 sm:w-8 sm:text-sm">
                    {deal.company[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground sm:text-sm">
                      {deal.title}
                    </p>
                    <p className="truncate text-xs text-base-gray-400">
                      {deal.company} • {deal.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {deal.amount}
                  </p>
                  <Badge
                    variant={
                      deal.status === 'Contract Sent' ? 'default' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {deal.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
