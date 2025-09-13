import { MoreHorizontal } from 'lucide-react'

import { useOpportunities } from '~/contexts/opportunities-provider'
import { Opportunity, OpportunityStage } from '~/types'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface OpportunityCardProps {
  opportunity: Opportunity
}

export const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  const { updateOpportunity } = useOpportunities()

  const getStageColor = (stage: OpportunityStage) => {
    switch (stage) {
      case 'Prospecting':
        return 'bg-blue-500/10 text-blue-500'
      case 'Qualification':
        return 'bg-yellow-500/10 text-yellow-500'
      case 'Proposal':
        return 'bg-purple-500/10 text-purple-500'
      case 'Negotiation':
        return 'bg-orange-500/10 text-orange-500'
      case 'Closed Won':
        return 'bg-green-500/10 text-green-500'
      case 'Closed Lost':
        return 'bg-red-500/10 text-red-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-foreground">
                {opportunity.name}
              </h3>
              <p className="truncate text-sm text-base-gray-400">
                #{opportunity.id.slice(0, 8)}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Account */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {opportunity.accountName[0]}
            </div>
            <span className="truncate text-sm text-base-gray-300">
              {opportunity.accountName}
            </span>
          </div>

          {/* Stage */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-base-gray-400">Stage:</span>
            <Select
              value={opportunity.stage}
              onValueChange={(value) =>
                updateOpportunity(opportunity.id, {
                  stage: value as OpportunityStage,
                })
              }
            >
              <SelectTrigger className="h-8 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Prospecting">Prospecting</SelectItem>
                <SelectItem value="Qualification">Qualification</SelectItem>
                <SelectItem value="Proposal">Proposal</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
                <SelectItem value="Closed Won">Closed Won</SelectItem>
                <SelectItem value="Closed Lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-base-gray-400">Amount:</span>
            <span className="font-medium text-foreground">
              {opportunity.amount
                ? `$${opportunity.amount.toLocaleString()}`
                : 'Not set'}
            </span>
          </div>

          {/* Stage Badge */}
          <div className="flex justify-center pt-2">
            <Badge
              variant="secondary"
              className={`text-xs ${getStageColor(opportunity.stage)}`}
            >
              {opportunity.stage}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
