import { Opportunity, OpportunityStage } from '~/types'

import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface OpportunitiesListProps {
  opportunities: Opportunity[]
  onUpdateOpportunity: (id: string, updates: Partial<Opportunity>) => void
}

export const OpportunitiesList = ({
  opportunities,
  onUpdateOpportunity,
}: OpportunitiesListProps) => {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Closed Won':
        return 'default'
      case 'Proposal':
      case 'Negotiation':
        return 'secondary'
      case 'Qualification':
        return 'outline'
      default:
        return 'destructive'
    }
  }

  if (opportunities.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-base-gray-400">
            No opportunities created yet. Convert a lead to get started.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Opportunities ({opportunities.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="p-4 text-left text-foreground">Name</th>
                <th className="p-4 text-left text-foreground">Account</th>
                <th className="p-4 text-left text-foreground">Stage</th>
                <th className="p-4 text-left text-foreground">Amount</th>
                <th className="p-4 text-left text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opportunity) => (
                <tr
                  key={opportunity.id}
                  className="border-b border-border hover:bg-background-secondary"
                >
                  <td className="p-4 font-medium text-foreground">
                    {opportunity.name}
                  </td>
                  <td className="p-4 text-base-gray-300">
                    {opportunity.accountName}
                  </td>
                  <td className="p-4">
                    <Select
                      value={opportunity.stage}
                      onValueChange={(value) =>
                        onUpdateOpportunity(opportunity.id, {
                          stage: value as OpportunityStage,
                        })
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Prospecting">Prospecting</SelectItem>
                        <SelectItem value="Qualification">
                          Qualification
                        </SelectItem>
                        <SelectItem value="Proposal">Proposal</SelectItem>
                        <SelectItem value="Negotiation">Negotiation</SelectItem>
                        <SelectItem value="Closed Won">Closed Won</SelectItem>
                        <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4 text-base-gray-300">
                    {opportunity.amount
                      ? `$${opportunity.amount.toLocaleString()}`
                      : '-'}
                  </td>
                  <td className="p-4">
                    <Badge variant={getStageColor(opportunity.stage)}>
                      {opportunity.stage}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
