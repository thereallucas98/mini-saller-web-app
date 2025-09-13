export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Unqualified'

export type OpportunityStage =
  | 'Prospecting'
  | 'Qualification'
  | 'Proposal'
  | 'Negotiation'
  | 'Closed Won'
  | 'Closed Lost'

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  source: string
  score: number
  status: LeadStatus
}

export interface Opportunity {
  id: string
  leadId: string // Reference to the original lead
  name: string
  stage: OpportunityStage
  amount?: number
  accountName: string
}
