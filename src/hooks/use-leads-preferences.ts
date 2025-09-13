import { useCallback, useEffect, useState } from 'react'

import { LeadStatus } from '~/types'

interface LeadsPreferences {
  search: string
  status: LeadStatus | 'All'
  sortBy: 'score' | 'name' | 'company'
  sortOrder: 'asc' | 'desc'
  limit: number
}

const STORAGE_KEY = 'leads-preferences'

const defaultPreferences: LeadsPreferences = {
  search: '',
  status: 'All',
  sortBy: 'score',
  sortOrder: 'desc',
  limit: 10,
}

export const useLeadsPreferences = () => {
  const [preferences, setPreferences] =
    useState<LeadsPreferences>(defaultPreferences)

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setPreferences({ ...defaultPreferences, ...parsed })
      }
    } catch (error) {
      console.warn('Failed to load leads preferences from localStorage:', error)
    }
  }, [])

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
    } catch (error) {
      console.warn('Failed to save leads preferences to localStorage:', error)
    }
  }, [preferences])

  const updatePreferences = useCallback(
    (updates: Partial<LeadsPreferences>) => {
      setPreferences((prev) => ({ ...prev, ...updates }))
    },
    [],
  )

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    preferences,
    updatePreferences,
    resetPreferences,
  }
}
