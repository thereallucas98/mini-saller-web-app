import { Info } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useOpportunities } from '~/contexts/opportunities-provider'
import { Lead, LeadStatus } from '~/types'

import { Loader } from '../loader'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Pagination } from '../ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
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
        <div className="flex w-full flex-col items-center justify-center py-8 text-center">
          <Info className="mb-2 h-4 w-4 text-base-gray-400" />
          <p className="mb-4 text-base-gray-400">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      )
    }

    if (leads.length === 0) {
      return (
        <div className="flex w-full flex-col items-center justify-center py-8 text-center">
          <div className="mb-2 text-base-gray-400">📋</div>
          <p className="text-base-gray-400">No leads found</p>
        </div>
      )
    }

    return (
      <>
        {/* Desktop Table */}
        <div className="hidden w-full overflow-x-auto lg:block">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="p-4 text-left text-foreground">Name</th>
                <th className="p-4 text-left text-foreground">Company</th>
                <th className="p-4 text-left text-foreground">Email</th>
                <th className="p-4 text-left text-foreground">Source</th>
                <th className="p-4 text-left text-foreground">Score</th>
                <th className="p-4 text-left text-foreground">Status</th>
                <th className="p-4 text-left text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="cursor-pointer border-b border-border hover:bg-background-secondary"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="p-4 font-medium text-foreground">
                    {lead.name}
                  </td>
                  <td className="p-4 text-base-gray-300">{lead.company}</td>
                  <td className="p-4 text-base-gray-300">{lead.email}</td>
                  <td className="p-4 text-base-gray-300">{lead.source}</td>
                  <td className="p-4">
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
                  </td>
                  <td className="p-4">
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
                  </td>
                  <td className="p-4">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    onCreateOpportunity,
    setSelectedLead,
    hasOpportunityForLead,
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
