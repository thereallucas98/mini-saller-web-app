import { createContext, ReactNode, useContext, useState } from 'react'

import { Opportunity } from '~/types'

interface OpportunitiesContextType {
  opportunities: Opportunity[]
  createOpportunity: (
    leadId: string,
    leadName: string,
    accountName: string,
    amount?: number,
  ) => Opportunity | null
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void
  hasOpportunityForLead: (leadId: string) => boolean
}

const OpportunitiesContext = createContext<
  OpportunitiesContextType | undefined
>(undefined)

interface OpportunitiesProviderProps {
  children: ReactNode
}

export const OpportunitiesProvider = ({
  children,
}: OpportunitiesProviderProps) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])

  const createOpportunity = (
    leadId: string,
    leadName: string,
    accountName: string,
    amount?: number,
  ) => {
    // Check if opportunity already exists for this lead
    const existingOpportunity = opportunities.find(
      (opp) => opp.leadId === leadId,
    )
    if (existingOpportunity) {
      return null // Return null to indicate duplicate
    }

    const newOpportunity: Opportunity = {
      id: crypto.randomUUID(),
      leadId,
      name: leadName,
      stage: 'Prospecting',
      amount,
      accountName,
    }

    // Optimistic update - add immediately to UI
    setOpportunities((prev) => [...prev, newOpportunity])
    
    // Simulate API call with potential failure
    setTimeout(() => {
      // Simulate 10% failure rate for demonstration
      if (Math.random() < 0.1) {
        // Rollback on simulated failure
        setOpportunities((prev) => 
          prev.filter(opp => opp.id !== newOpportunity.id)
        )
        console.warn('Simulated API failure - opportunity creation rolled back')
      }
    }, 1000)

    return newOpportunity
  }

  const hasOpportunityForLead = (leadId: string) => {
    return opportunities.some((opp) => opp.leadId === leadId)
  }

  const updateOpportunity = (id: string, updates: Partial<Opportunity>) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, ...updates } : opp)),
    )
  }

  return (
    <OpportunitiesContext.Provider
      value={{
        opportunities,
        createOpportunity,
        updateOpportunity,
        hasOpportunityForLead,
      }}
    >
      {children}
    </OpportunitiesContext.Provider>
  )
}

export const useOpportunities = () => {
  const context = useContext(OpportunitiesContext)
  if (context === undefined) {
    throw new Error(
      'useOpportunities must be used within an OpportunitiesProvider',
    )
  }
  return context
}
