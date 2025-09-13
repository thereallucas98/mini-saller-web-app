import { Plus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '~/components/ui/button'
import { useOpportunities } from '~/contexts/opportunities-provider'
import { useLeadsApi } from '~/hooks/use-leads-api'
import { useLeadsUrlParams } from '~/hooks/use-leads-url-params'
import { Lead } from '~/types'

import { LeadsList } from './components/leads-list'
import { LeadsOverview } from './components/leads-overview'

export const LeadsPage = () => {
  const {
    params,
    handlePageChange,
    handleSearchChange,
    handleStatusFilterChange,
    handleSortChange,
  } = useLeadsUrlParams()

  const [localSearch, setLocalSearch] = useState(params.search)

  useEffect(() => {
    setLocalSearch(params.search)
  }, [params.search])

  const {
    leads,
    loading,
    error,
    total,
    totalPages,
    updateLead: updateLeadApi,
  } = useLeadsApi({
    page: params.page,
    limit: params.limit,
    search: params.search,
    status: params.status,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
  })

  const handleUpdateLead = useCallback(
    async (id: string, updates: Partial<Lead>) => {
      try {
        await updateLeadApi(id, updates)
        console.log(`Lead ${id} updated successfully`, updates)
        alert(`✅ Lead updated successfully`)
      } catch (err) {
        console.error('Failed to update lead:', err)
        alert(
          `❌ Failed to update lead: ${err instanceof Error ? err.message : 'Unknown error'}`,
        )
      }
    },
    [updateLeadApi],
  )

  const { createOpportunity, hasOpportunityForLead } = useOpportunities()

  const handleCreateOpportunity = useCallback(
    (
      leadId: string,
      leadName: string,
      accountName: string,
      amount?: number,
    ) => {
      // Check if opportunity already exists
      if (hasOpportunityForLead(leadId)) {
        alert(`⚠️ An opportunity already exists for ${leadName}`)
        return
      }

      const opportunity = createOpportunity(
        leadId,
        leadName,
        accountName,
        amount,
      )

      if (opportunity) {
        console.log(
          `Created opportunity for ${leadName} at ${accountName}`,
          opportunity,
        )
        alert(`✅ Opportunity created for ${leadName} at ${accountName}`)
      } else {
        alert(`❌ Failed to create opportunity for ${leadName}`)
      }
    },
    [createOpportunity, hasOpportunityForLead],
  )

  const handleLocalSearchChange = useCallback((searchValue: string) => {
    setLocalSearch(searchValue)
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearch !== params.search) {
        handleSearchChange(localSearch)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [localSearch, params.search, handleSearchChange])

  return (
    <div className="w-full max-w-[1440px] space-y-4 p-4 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Leads
          </h1>
          <p className="mt-1 text-sm text-base-gray-400 sm:mt-2 sm:text-base">
            Discover, Engage, Convert
          </p>
        </div>
        <Button className="hover:bg-primary/90 w-full bg-primary sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Lead
        </Button>
      </div>

      {/* Overview Section */}
      <LeadsOverview />

      {/* Leads List */}
      <LeadsList
        leads={leads}
        loading={loading}
        error={error}
        total={total}
        totalPages={totalPages}
        currentPage={params.page}
        searchQuery={localSearch}
        statusFilter={params.status}
        sortBy={params.sortBy}
        onUpdateLead={handleUpdateLead}
        onCreateOpportunity={handleCreateOpportunity}
        onPageChange={handlePageChange}
        onSearchChange={handleLocalSearchChange}
        onStatusFilterChange={handleStatusFilterChange}
        onSortChange={handleSortChange}
      />
    </div>
  )
}
