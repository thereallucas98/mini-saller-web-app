import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { LeadStatus } from '~/types'
import { useLeadsPreferences } from './use-leads-preferences'

export interface LeadsUrlParams {
  page: number
  limit: number
  search: string
  status: LeadStatus | 'All'
  sortBy: 'score' | 'name' | 'company'
  sortOrder: 'asc' | 'desc'
}

export const useLeadsUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { preferences, updatePreferences } = useLeadsPreferences()

  // Parse URL parameters with localStorage fallback
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || preferences.limit.toString(), 10)
  const search = searchParams.get('search') || preferences.search
  const status = (searchParams.get('status') as LeadStatus | 'All') || preferences.status
  const sortBy = (searchParams.get('sortBy') as 'score' | 'name' | 'company') || preferences.sortBy
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || preferences.sortOrder

  const params = useMemo(
    () => ({
      page,
      limit,
      search,
      status,
      sortBy,
      sortOrder,
    }),
    [page, limit, search, status, sortBy, sortOrder],
  )

  const handlePageChange = useCallback(
    (pageIndex: number) => {
      setSearchParams((prev) => {
        prev.set('page', pageIndex.toString())
        return prev
      })
    },
    [setSearchParams],
  )

  const handleSearchChange = useCallback(
    (searchValue: string) => {
      setSearchParams((prev) => {
        if (searchValue) {
          prev.set('search', searchValue)
        } else {
          prev.delete('search')
        }
        prev.set('page', '1')
        return prev
      })
      // Save to localStorage
      updatePreferences({ search: searchValue })
    },
    [setSearchParams, updatePreferences],
  )

  const handleStatusFilterChange = useCallback(
    (statusValue: LeadStatus | 'All') => {
      setSearchParams((prev) => {
        if (statusValue === 'All') {
          prev.delete('status')
        } else {
          prev.set('status', statusValue)
        }
        prev.set('page', '1')
        return prev
      })
      // Save to localStorage
      updatePreferences({ status: statusValue })
    },
    [setSearchParams, updatePreferences],
  )

  const handleSortChange = useCallback(
    (sortByValue: 'score' | 'name' | 'company') => {
      setSearchParams((prev) => {
        prev.set('sortBy', sortByValue)
        prev.set('page', '1')
        return prev
      })
      // Save to localStorage
      updatePreferences({ sortBy: sortByValue })
    },
    [setSearchParams, updatePreferences],
  )

  const handleSortOrderChange = useCallback(
    (sortOrderValue: 'asc' | 'desc') => {
      setSearchParams((prev) => {
        prev.set('sortOrder', sortOrderValue)
        prev.set('page', '1')
        return prev
      })
      // Save to localStorage
      updatePreferences({ sortOrder: sortOrderValue })
    },
    [setSearchParams, updatePreferences],
  )

  const resetParams = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete('search')
      prev.delete('status')
      prev.delete('sortBy')
      prev.delete('sortOrder')
      prev.set('page', '1')
      return prev
    })
    // Reset localStorage preferences
    updatePreferences({
      search: '',
      status: 'All',
      sortBy: 'score',
      sortOrder: 'desc',
      limit: 10,
    })
  }, [setSearchParams, updatePreferences])

  return {
    params,
    handlePageChange,
    handleSearchChange,
    handleStatusFilterChange,
    handleSortChange,
    handleSortOrderChange,
    resetParams,
  }
}
