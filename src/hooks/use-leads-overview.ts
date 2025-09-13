import { useEffect, useState } from 'react'

import { Lead } from '~/types'

interface LeadsOverview {
  total: number
  new: number
  contacted: number
  qualified: number
  unqualified: number
}

const API_BASE_URL = 'http://localhost:3001'

export const useLeadsOverview = () => {
  const [overview, setOverview] = useState<LeadsOverview>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    unqualified: 0,
  })
  const [loading, setLoading] = useState(true)
  const [hasFetched, setHasFetched] = useState(false)

  useEffect(() => {
    if (hasFetched) return

    const fetchOverview = async () => {
      try {
        setLoading(true)

        // Fetch all leads for overview (no pagination)
        const response = await fetch(`${API_BASE_URL}/leads`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const leads: Lead[] = await response.json()

        // Calculate overview stats
        const stats = leads.reduce(
          (acc, lead) => {
            acc.total++
            switch (lead.status) {
              case 'New':
                acc.new++
                break
              case 'Contacted':
                acc.contacted++
                break
              case 'Qualified':
                acc.qualified++
                break
              case 'Unqualified':
                acc.unqualified++
                break
            }
            return acc
          },
          { total: 0, new: 0, contacted: 0, qualified: 0, unqualified: 0 },
        )

        setOverview(stats)
        setHasFetched(true)
      } catch (err) {
        console.error('Failed to fetch leads overview:', err)
        setOverview({
          total: 0,
          new: 0,
          contacted: 0,
          qualified: 0,
          unqualified: 0,
        })
        setHasFetched(true)
      } finally {
        setLoading(false)
      }
    }

    fetchOverview()
  }, [hasFetched])

  return { overview, loading }
}
