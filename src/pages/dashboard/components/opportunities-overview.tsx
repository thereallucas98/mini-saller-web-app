import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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

export const OpportunitiesOverview = () => {
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
  )
}
