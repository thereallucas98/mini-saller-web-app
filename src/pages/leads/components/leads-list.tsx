import { FileText } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Loader } from '~/components/loader'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { EmptyState } from '~/components/ui/empty-state'
import { ErrorState } from '~/components/ui/error-state'
import { Input } from '~/components/ui/input'
import { Pagination } from '~/components/ui/pagination'
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
import { Lead, LeadStatus } from '~/types'

import { LeadCard } from './lead-card'
import { LeadDetailPanel } from './lead-detail-panel'

interface LeadsListProps {
  leads: Lead[]
  loading: boolean
  error: string | null
  total: number
  totalPages: number
  currentPage: number
  searchQuery: string
  statusFilter: LeadStatus | 'All'
  sortBy: 'score' | 'name' | 'company'
  onUpdateLead: (id: string, updates: Partial<Lead>) => Promise<void>
  onCreateOpportunity: (
    leadId: string,
    leadName: string,
    accountName: string,
    amount?: number,
  ) => void
  onPageChange: (page: number) => void
  onSearchChange: (search: string) => void
  onStatusFilterChange: (status: LeadStatus | 'All') => void
  onSortChange: (sortBy: 'score' | 'name' | 'company') => void
}

export const LeadsList = ({
  leads,
  loading,
  error,
  total,
  totalPages,
  currentPage,
  searchQuery,
  statusFilter,
  sortBy,
  onUpdateLead,
  onCreateOpportunity,
  onPageChange,
  onSearchChange,
  onStatusFilterChange,
  onSortChange,
}: LeadsListProps) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const { hasOpportunityForLead } = useOpportunities()

  const renderTableContent = useMemo(() => {
    if (loading) {
      return (
        <div className="flex w-full items-center justify-center py-8">
          <Loader />
        </div>
      )
    }

    if (error) {
      return (
        <ErrorState
          description={error}
          onRetry={() => window.location.reload()}
        />
      )
    }

    if (leads.length === 0) {
      return (
        <EmptyState
          icon={FileText}
          title="No leads found"
          description={
            searchQuery || statusFilter !== 'All'
              ? 'Try adjusting your search or filter criteria.'
              : 'No leads available. Create your first lead to get started.'
          }
        />
      )
    }

    return (
      <>
        {/* Desktop Table */}
        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Name</TableHead>
                <TableHead className="text-foreground">Company</TableHead>
                <TableHead className="text-foreground">Email</TableHead>
                <TableHead className="text-foreground">Source</TableHead>
                <TableHead className="text-foreground">Score</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer hover:bg-background-secondary"
                  onClick={() => setSelectedLead(lead)}
                >
                  <TableCell className="font-medium text-foreground">
                    {lead.name}
                  </TableCell>
                  <TableCell className="text-base-gray-300">
                    {lead.company}
                  </TableCell>
                  <TableCell className="text-base-gray-300">
                    {lead.email}
                  </TableCell>
                  <TableCell className="text-base-gray-300">
                    {lead.source}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        lead.score >= 80
                          ? 'default'
                          : lead.score >= 60
                            ? 'secondary'
                            : 'destructive'
                      }
                    >
                      {lead.score}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
                      >
                        Convert
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 lg:hidden">
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onSelect={setSelectedLead}
              onCreateOpportunity={onCreateOpportunity}
            />
          ))}
        </div>
      </>
    )
  }, [
    loading,
    error,
    leads,
    searchQuery,
    statusFilter,
    hasOpportunityForLead,
    onCreateOpportunity,
  ])

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Leads ({total})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="w-full">
            <Input
              placeholder="Search by name or company..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="flex-1 sm:w-48">
              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  onStatusFilterChange(value as LeadStatus | 'All')
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Unqualified">Unqualified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 sm:w-32">
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Score</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">{renderTableContent}</CardContent>
      </Card>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      {/* Lead Detail Panel */}
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdateLead={onUpdateLead}
        />
      )}
    </div>
  )
}
