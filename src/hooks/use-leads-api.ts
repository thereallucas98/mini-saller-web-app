import { useEffect, useState } from 'react'

import { Lead, LeadStatus } from '~/types'

// interface LeadsResponse {
//   data: Lead[]
//   total: number
//   page: number
//   limit: number
//   totalPages: number
// }

interface UseLeadsApiOptions {
  page?: number
  limit?: number
  search?: string
  status?: LeadStatus | 'All'
  sortBy?: 'score' | 'name' | 'company'
  sortOrder?: 'asc' | 'desc'
}

const API_BASE_URL = 'http://localhost:3001'

export const useLeadsApi = (options: UseLeadsApiOptions = {}) => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const {
    page = 1,
    limit = 10,
    search = '',
    status = 'All',
    sortBy = 'score',
    sortOrder = 'desc',
  } = options

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true)
        setError(null)

        let data: Lead[] = []
        let totalCount = 0

        if (search) {
          // When searching, fetch all leads and filter on client side
          // This allows us to search both name and company fields
          const searchParams = new URLSearchParams({
            _sort: sortBy,
            _order: sortOrder,
          })

          // Add status filter
          if (status !== 'All') {
            searchParams.append('status', status)
          }

          // Fetch all leads that match status filter
          const response = await fetch(`${API_BASE_URL}/leads?${searchParams}`)

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const allLeads: Lead[] = await response.json()

          // Filter leads that match the search term in name or company
          const filteredLeads = allLeads.filter(
            (lead) =>
              lead.name.toLowerCase().includes(search.toLowerCase()) ||
              lead.company.toLowerCase().includes(search.toLowerCase()),
          )

          totalCount = filteredLeads.length

          // Apply pagination to filtered results
          const startIndex = (page - 1) * limit
          const endIndex = startIndex + limit
          data = filteredLeads.slice(startIndex, endIndex)
        } else {
          // No search - use normal server-side pagination
          const params = new URLSearchParams({
            _page: page.toString(),
            _limit: limit.toString(),
            _sort: sortBy,
            _order: sortOrder,
          })

          // Add status filter
          if (status !== 'All') {
            params.append('status', status)
          }

          const response = await fetch(`${API_BASE_URL}/leads?${params}`)

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          data = await response.json()

          // Get total count from X-Total-Count header
          totalCount = parseInt(response.headers.get('X-Total-Count') || '0')
        }

        const totalPagesCount = Math.ceil(totalCount / limit)

        setLeads(data)
        setTotal(totalCount)
        setTotalPages(totalPagesCount)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leads')
        setLeads([])
        setTotal(0)
        setTotalPages(0)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [page, limit, search, status, sortBy, sortOrder])

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const updatedLead = await response.json()

      // Update local state
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? updatedLead : lead)),
      )

      return updatedLead
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lead')
      throw err
    }
  }

  return {
    leads,
    loading,
    error,
    total,
    totalPages,
    updateLead,
  }
}
