import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

interface ListItem {
  id?: string
  name?: string
  description?: string
  email?: string
  avatar?: string
  action?: string
  time?: string
  amount?: string
  status?: string
  company?: string
  title?: string
}

interface ListCardProps {
  title: string
  items: ListItem[]
  showViewAll?: boolean
  type: 'activity' | 'contact' | 'company' | 'deal'
}

export const ListCard = ({
  title,
  items,
  showViewAll = true,
  type,
}: ListCardProps) => {
  const renderItem = (item: ListItem, index: number) => {
    switch (type) {
      case 'activity':
        return (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background-tertiary sm:h-8 sm:w-8">
              <div className="h-1.5 w-1.5 rounded-full bg-primary sm:h-2 sm:w-2"></div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-foreground sm:text-sm">
                {item.description}
              </p>
              <div className="mt-1 flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                <Badge variant="outline" className="w-fit text-xs">
                  {item.action}
                </Badge>
                <span className="text-xs text-base-gray-400">{item.time}</span>
              </div>
            </div>
          </div>
        )

      case 'contact':
      case 'company':
        return (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground sm:h-8 sm:w-8 sm:text-sm">
              {item.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground sm:text-sm">
                {item.name}
              </p>
              <p className="truncate text-xs text-base-gray-400">
                {item.email}
              </p>
            </div>
          </div>
        )

      case 'deal':
        return (
          <div
            key={index}
            className="flex flex-col space-y-3 rounded-lg bg-background-secondary p-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground sm:h-8 sm:w-8 sm:text-sm">
                {item.company?.[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground sm:text-sm">
                  {item.title}
                </p>
                <p className="truncate text-xs text-base-gray-400">
                  {item.company} • {item.email}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:flex-col sm:items-end sm:space-y-1">
              <p className="text-sm font-semibold text-foreground">
                {item.amount}
              </p>
              <Badge
                variant={
                  item.status === 'Contract Sent' ? 'default' : 'secondary'
                }
                className="text-xs"
              >
                {item.status}
              </Badge>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold text-foreground sm:text-base">
          {title}
        </CardTitle>
        {showViewAll && (
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.slice(0, 3).map((item, index) => renderItem(item, index))}
        </div>
      </CardContent>
    </Card>
  )
}
