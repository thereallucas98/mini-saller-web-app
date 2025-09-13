import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { LeadStatus } from '~/types'

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

  // Parse URL parameters with defaults
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const search = searchParams.get('search') || ''
  const status = (searchParams.get('status') as LeadStatus | 'All') || 'All'
  const sortBy =
    (searchParams.get('sortBy') as 'score' | 'name' | 'company') || 'score'
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'

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
    },
    [setSearchParams],
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
    },
    [setSearchParams],
  )

  const handleSortChange = useCallback(
    (sortByValue: 'score' | 'name' | 'company') => {
      setSearchParams((prev) => {
        prev.set('sortBy', sortByValue)
        prev.set('page', '1')
        return prev
      })
    },
    [setSearchParams],
  )

  const handleSortOrderChange = useCallback(
    (sortOrderValue: 'asc' | 'desc') => {
      setSearchParams((prev) => {
        prev.set('sortOrder', sortOrderValue)
        prev.set('page', '1')
        return prev
      })
    },
    [setSearchParams],
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
  }, [setSearchParams])

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
