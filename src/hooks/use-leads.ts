import { useEffect, useState } from 'react'

import leadsData from '../data/leads.json'
import { Lead, LeadStatus } from '../types'

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setLeads(leadsData as Lead[])
        setError(null)
      } catch (err) {
        setError('Failed to load leads')
      } finally {
        setLoading(false)
      }
    }

    loadLeads()
  }, [])

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead)),
    )
  }

  const searchLeads = (query: string) => {
    if (!query.trim()) return leads
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(query.toLowerCase()) ||
        lead.company.toLowerCase().includes(query.toLowerCase()),
    )
  }

  const filterLeadsByStatus = (status: LeadStatus | 'All') => {
    if (status === 'All') return leads
    return leads.filter((lead) => lead.status === status)
  }

  const sortLeadsByScore = (leads: Lead[]) => {
    return [...leads].sort((a, b) => b.score - a.score)
  }

  return {
    leads,
    loading,
    error,
    updateLead,
    searchLeads,
    filterLeadsByStatus,
    sortLeadsByScore,
  }
}
