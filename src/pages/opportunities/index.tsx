import { MoreHorizontal, Plus, Target } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { EmptyState } from '~/components/ui/empty-state'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { useOpportunities } from '~/contexts/opportunities-provider'
import { OpportunityStage } from '~/types'

import { OpportunitiesFilters } from './components/opportunities-filters'
import { OpportunitiesOverview } from './components/opportunities-overview'
import { OpportunityCard } from './components/opportunity-card'

export const OpportunitiesPage = () => {
  const { opportunities, updateOpportunity } = useOpportunities()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [stageFilter, setStageFilter] = useState<OpportunityStage | 'All'>(
    'All',
  )

  // Filter opportunities based on search and stage
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesSearch =
        searchQuery === '' ||
        opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.accountName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())

      const matchesStage =
        stageFilter === 'All' || opportunity.stage === stageFilter

      return matchesSearch && matchesStage
    })
  }, [opportunities, searchQuery, stageFilter])

  return (
    <div className="w-full max-w-[1440px] space-y-4 p-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Opportunities
          </h1>
          <p className="mt-1 text-sm text-base-gray-400 sm:mt-2 sm:text-base">
            Convert leads into successful deals
          </p>
        </div>
        <Button className="hover:bg-primary/90 w-full bg-primary sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Opportunity
        </Button>
      </div>

      {/* Overview Section */}
      <OpportunitiesOverview />

      {/* Filters */}
      <OpportunitiesFilters
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        stageFilter={stageFilter}
        onStageFilterChange={setStageFilter}
      />

      {/* Opportunities Content */}
      {filteredOpportunities.length === 0 ? (
        <Card>
          <CardContent>
            <EmptyState
              icon={Target}
              title="No opportunities found"
              description={
                opportunities.length === 0
                  ? 'No opportunities created yet. Convert a lead to get started.'
                  : 'Try adjusting your search or filter criteria.'
              }
            />
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">Name</TableHead>
                      <TableHead className="text-foreground">Account</TableHead>
                      <TableHead className="text-foreground">Stage</TableHead>
                      <TableHead className="text-foreground">Amount</TableHead>
                      <TableHead className="text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOpportunities.map((opportunity) => (
                      <TableRow
                        key={opportunity.id}
                        className="hover:bg-background-secondary"
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium text-foreground">
                              {opportunity.name}
                            </div>
                            <div className="text-sm text-base-gray-400">
                              #{opportunity.id.slice(0, 8)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                              {opportunity.accountName[0]}
                            </div>
                            <span className="text-base-gray-300">
                              {opportunity.accountName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={opportunity.stage}
                            onValueChange={(value) =>
                              updateOpportunity(opportunity.id, {
                                stage: value as OpportunityStage,
                              })
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Prospecting">
                                Prospecting
                              </SelectItem>
                              <SelectItem value="Qualification">
                                Qualification
                              </SelectItem>
                              <SelectItem value="Proposal">Proposal</SelectItem>
                              <SelectItem value="Negotiation">
                                Negotiation
                              </SelectItem>
                              <SelectItem value="Closed Won">
                                Closed Won
                              </SelectItem>
                              <SelectItem value="Closed Lost">
                                Closed Lost
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-base-gray-300">
                          {opportunity.amount
                            ? `$${opportunity.amount.toLocaleString()}`
                            : 'Not set'}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
