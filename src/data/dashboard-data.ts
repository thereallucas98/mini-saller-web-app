import { formatCompactCurrency, formatNumber } from '~/utils'

export interface RecentActivity {
  type: 'company' | 'contact' | 'deal' | 'lead'
  action: 'CREATED' | 'MODIFIED' | 'UPDATED' | 'CONVERTED'
  description: string
  time: string
}

export interface Contact {
  name: string
  email: string
  avatar: string
  company?: string
}

export interface Company {
  name: string
  email: string
  avatar: string
  industry?: string
  employees?: string
}

export interface Deal {
  title: string
  amount: string
  status:
    | 'Contract Sent'
    | 'Waiting on us'
    | 'Negotiation'
    | 'Closed Won'
    | 'Closed Lost'
  company: string
  email: string
  probability?: number
}

export interface TaskMetric {
  label: string
  count: number
  color: string
}

export const recentActivity: RecentActivity[] = [
  {
    type: 'company',
    action: 'CREATED',
    description: "Company 'TechFlow Solutions' by Maria Silva",
    time: 'Dec 15, 09:30AM',
  },
  {
    type: 'contact',
    action: 'MODIFIED',
    description: "Contact 'Carlos Mendes' by Ana Oliveira",
    time: 'Dec 15, 08:45AM',
  },
  {
    type: 'deal',
    action: 'UPDATED',
    description: "Deal 'E-commerce Platform' by Pedro Costa",
    time: 'Dec 15, 08:15AM',
  },
  {
    type: 'lead',
    action: 'CONVERTED',
    description: "Lead 'Sarah Johnson' converted to opportunity",
    time: 'Dec 15, 07:30AM',
  },
  {
    type: 'company',
    action: 'MODIFIED',
    description: "Company 'Digital Innovations' by Lucas Ferreira",
    time: 'Dec 14, 06:20PM',
  },
  {
    type: 'contact',
    action: 'CREATED',
    description: "Contact 'Roberto Alves' by Fernanda Lima",
    time: 'Dec 14, 05:45PM',
  },
  {
    type: 'deal',
    action: 'UPDATED',
    description: "Deal 'Mobile App Development' by Marcos Pereira",
    time: 'Dec 14, 04:30PM',
  },
  {
    type: 'lead',
    action: 'MODIFIED',
    description: "Lead 'Patricia Souza' status updated",
    time: 'Dec 14, 03:15PM',
  },
  {
    type: 'company',
    action: 'CREATED',
    description: "Company 'CloudTech Systems' by Diego Michelato",
    time: 'Dec 14, 02:00PM',
  },
  {
    type: 'contact',
    action: 'UPDATED',
    description: "Contact 'Lucia Ferreira' by João Silva",
    time: 'Dec 14, 01:30PM',
  },
]

export const contacts: Contact[] = [
  {
    name: 'Carlos Mendes',
    email: 'carlos.mendes@techflow.com',
    avatar: 'CM',
    company: 'TechFlow Solutions',
  },
  {
    name: 'Ana Oliveira',
    email: 'ana.oliveira@digitalinnovations.com',
    avatar: 'AO',
    company: 'Digital Innovations',
  },
  {
    name: 'Pedro Costa',
    email: 'pedro.costa@cloudtech.com',
    avatar: 'PC',
    company: 'CloudTech Systems',
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@startupx.com',
    avatar: 'SJ',
    company: 'StartupX',
  },
  {
    name: 'Lucas Ferreira',
    email: 'lucas.ferreira@innovatelab.com',
    avatar: 'LF',
    company: 'InnovateLab',
  },
  {
    name: 'Roberto Alves',
    email: 'roberto.alves@datasync.com',
    avatar: 'RA',
    company: 'DataSync',
  },
  {
    name: 'Fernanda Lima',
    email: 'fernanda.lima@smartsystems.com',
    avatar: 'FL',
    company: 'SmartSystems',
  },
  {
    name: 'Marcos Pereira',
    email: 'marcos.pereira@nextgen.com',
    avatar: 'MP',
    company: 'NextGen Solutions',
  },
  {
    name: 'Patricia Souza',
    email: 'patricia.souza@innovationhub.com',
    avatar: 'PS',
    company: 'InnovationHub',
  },
  {
    name: 'Diego Michelato',
    email: 'diego.michelato@futuretech.com',
    avatar: 'DM',
    company: 'FutureTech',
  },
]

export const companies: Company[] = [
  {
    name: 'TechFlow Solutions',
    email: 'contact@techflow.com',
    avatar: 'TF',
    industry: 'Software Development',
    employees: '50-100',
  },
  {
    name: 'Digital Innovations',
    email: 'info@digitalinnovations.com',
    avatar: 'DI',
    industry: 'Digital Marketing',
    employees: '20-50',
  },
  {
    name: 'CloudTech Systems',
    email: 'hello@cloudtech.com',
    avatar: 'CT',
    industry: 'Cloud Services',
    employees: '100-200',
  },
  {
    name: 'StartupX',
    email: 'contact@startupx.com',
    avatar: 'SX',
    industry: 'Fintech',
    employees: '10-20',
  },
  {
    name: 'InnovateLab',
    email: 'info@innovatelab.com',
    avatar: 'IL',
    industry: 'Research & Development',
    employees: '30-50',
  },
  {
    name: 'DataSync',
    email: 'hello@datasync.com',
    avatar: 'DS',
    industry: 'Data Analytics',
    employees: '25-40',
  },
  {
    name: 'SmartSystems',
    email: 'contact@smartsystems.com',
    avatar: 'SS',
    industry: 'IoT Solutions',
    employees: '40-60',
  },
  {
    name: 'NextGen Solutions',
    email: 'info@nextgen.com',
    avatar: 'NG',
    industry: 'AI & Machine Learning',
    employees: '60-80',
  },
  {
    name: 'InnovationHub',
    email: 'hello@innovationhub.com',
    avatar: 'IH',
    industry: 'Consulting',
    employees: '15-30',
  },
  {
    name: 'FutureTech',
    email: 'contact@futuretech.com',
    avatar: 'FT',
    industry: 'Emerging Technologies',
    employees: '80-120',
  },
]

export const deals: Deal[] = [
  {
    title: 'E-commerce Platform Development',
    amount: '$150,000',
    status: 'Contract Sent',
    company: 'TechFlow Solutions',
    email: 'contact@techflow.com',
    probability: 85,
  },
  {
    title: 'Mobile App Development',
    amount: '$95,000',
    status: 'Negotiation',
    company: 'Digital Innovations',
    email: 'info@digitalinnovations.com',
    probability: 70,
  },
  {
    title: 'Cloud Migration Services',
    amount: '$200,000',
    status: 'Waiting on us',
    company: 'CloudTech Systems',
    email: 'hello@cloudtech.com',
    probability: 60,
  },
  {
    title: 'Payment Gateway Integration',
    amount: '$75,000',
    status: 'Closed Won',
    company: 'StartupX',
    email: 'contact@startupx.com',
    probability: 100,
  },
  {
    title: 'AI Research Project',
    amount: '$180,000',
    status: 'Contract Sent',
    company: 'InnovateLab',
    email: 'info@innovatelab.com',
    probability: 80,
  },
  {
    title: 'Data Analytics Dashboard',
    amount: '$120,000',
    status: 'Negotiation',
    company: 'DataSync',
    email: 'hello@datasync.com',
    probability: 65,
  },
  {
    title: 'IoT Device Management',
    amount: '$160,000',
    status: 'Waiting on us',
    company: 'SmartSystems',
    email: 'contact@smartsystems.com',
    probability: 55,
  },
  {
    title: 'Machine Learning Platform',
    amount: '$220,000',
    status: 'Contract Sent',
    company: 'NextGen Solutions',
    email: 'info@nextgen.com',
    probability: 75,
  },
  {
    title: 'Digital Transformation Consulting',
    amount: '$85,000',
    status: 'Closed Lost',
    company: 'InnovationHub',
    email: 'hello@innovationhub.com',
    probability: 0,
  },
  {
    title: 'Blockchain Implementation',
    amount: '$300,000',
    status: 'Negotiation',
    company: 'FutureTech',
    email: 'contact@futuretech.com',
    probability: 40,
  },
]

// Calculate dynamic task metrics based on deals and activity
export const getTaskMetrics = (): TaskMetric[] => {
  const startedDeals = deals.filter(
    (deal) =>
      deal.status === 'Contract Sent' || deal.status === 'Waiting on us',
  ).length

  const inProgressDeals = deals.filter(
    (deal) => deal.status === 'Negotiation',
  ).length

  const completedDeals = deals.filter(
    (deal) => deal.status === 'Closed Won',
  ).length

  const droppedDeals = deals.filter(
    (deal) => deal.status === 'Closed Lost',
  ).length

  // Add some activity-based metrics
  const recentActivities = recentActivity.length
  const totalContacts = contacts.length
  const totalCompanies = companies.length

  return [
    {
      label: 'Started',
      count: startedDeals + Math.floor(recentActivities * 0.3),
      color: 'bg-blue-500',
    },
    {
      label: 'In Progress',
      count: inProgressDeals + Math.floor(totalContacts * 0.2),
      color: 'bg-orange-500',
    },
    {
      label: 'Completed',
      count: completedDeals + Math.floor(totalCompanies * 0.4),
      color: 'bg-green-500',
    },
    {
      label: 'Dropped',
      count: droppedDeals + Math.floor(recentActivities * 0.1),
      color: 'bg-red-500',
    },
  ]
}

// Calculate dynamic deal metrics
export const getDealMetrics = () => {
  const totalDealsValue = deals.reduce((sum, deal) => {
    const amount = parseInt(deal.amount.replace(/[$,]/g, ''))
    return sum + amount
  }, 0)

  const thisYearValue = Math.floor(totalDealsValue * 0.7) // 70% of total
  const thisMonthValue = Math.floor(totalDealsValue * 0.15) // 15% of total

  return {
    thisYear: thisYearValue,
    thisMonth: thisMonthValue,
    thisYearFormatted: formatCompactCurrency(thisYearValue),
    thisMonthFormatted: formatCompactCurrency(thisMonthValue),
    totalDeals: deals.length,
    totalDealsFormatted: formatNumber(deals.length),
    wonDeals: deals.filter((deal) => deal.status === 'Closed Won').length,
    wonDealsFormatted: formatNumber(
      deals.filter((deal) => deal.status === 'Closed Won').length,
    ),
    lostDeals: deals.filter((deal) => deal.status === 'Closed Lost').length,
    lostDealsFormatted: formatNumber(
      deals.filter((deal) => deal.status === 'Closed Lost').length,
    ),
  }
}
