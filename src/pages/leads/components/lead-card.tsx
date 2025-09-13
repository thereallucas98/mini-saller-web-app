import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { useOpportunities } from '~/contexts/opportunities-provider'
import { Lead } from '~/types'

interface LeadCardProps {
  lead: Lead
  onSelect: (lead: Lead) => void
  onCreateOpportunity: (
    leadId: string,
    leadName: string,
    accountName: string,
    amount?: number,
  ) => void
}

export const LeadCard = ({
  lead,
  onSelect,
  onCreateOpportunity,
}: LeadCardProps) => {
  const { hasOpportunityForLead } = useOpportunities()
  return (
    <Card
      className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md"
      onClick={() => onSelect(lead)}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{lead.name}</h3>
              <p className="text-sm text-base-gray-300">{lead.company}</p>
            </div>
            <div className="flex gap-2">
              <Badge
                variant={
                  lead.score >= 80
                    ? 'default'
                    : lead.score >= 60
                      ? 'secondary'
                      : 'destructive'
                }
                className="text-xs"
              >
                {lead.score}
              </Badge>
              <Badge
                variant={
                  lead.status === 'Qualified'
                    ? 'default'
                    : lead.status === 'Contacted'
                      ? 'secondary'
                      : lead.status === 'New'
                        ? 'outline'
                        : 'destructive'
                }
                className="text-xs"
              >
                {lead.status}
              </Badge>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-base-gray-400">Email:</span>
              <span className="text-xs text-base-gray-300">{lead.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-base-gray-400">Source:</span>
              <span className="text-xs text-base-gray-300">{lead.source}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-2">
            {hasOpportunityForLead(lead.id) ? (
              <Badge variant="secondary" className="text-xs">
                Converted
              </Badge>
            ) : (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onCreateOpportunity(lead.id, lead.name, lead.company)
                }}
                className="text-xs"
              >
                Convert
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
