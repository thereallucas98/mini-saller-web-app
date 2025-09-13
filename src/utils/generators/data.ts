/**
 * Data generation utilities
 */

import { formatCompactDate, formatInitials } from '../formatters'

/**
 * Generates a random ID
 * @param prefix - Optional prefix for the ID
 * @param length - Length of the random part
 * @returns Generated ID
 */
export const generateId = (prefix: string = '', length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = prefix

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return result
}

/**
 * Generates a random email address
 * @param domain - Email domain (default: 'example.com')
 * @returns Generated email
 */
export const generateEmail = (domain: string = 'example.com'): string => {
  const names = [
    'john',
    'jane',
    'mike',
    'sarah',
    'david',
    'lisa',
    'chris',
    'anna',
  ]
  const surnames = [
    'smith',
    'johnson',
    'williams',
    'brown',
    'jones',
    'garcia',
    'miller',
    'davis',
  ]

  const name = names[Math.floor(Math.random() * names.length)]
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  const number = Math.floor(Math.random() * 100)

  return `${name}.${surname}${number}@${domain}`
}

/**
 * Generates a random phone number
 * @param format - Format type ('us' | 'international')
 * @returns Generated phone number
 */
export const generatePhoneNumber = (
  format: 'us' | 'international' = 'us',
): string => {
  const generateDigits = (count: number): string => {
    return Array.from({ length: count }, () =>
      Math.floor(Math.random() * 10),
    ).join('')
  }

  if (format === 'us') {
    return `(${generateDigits(3)}) ${generateDigits(3)}-${generateDigits(4)}`
  }

  return `+1 ${generateDigits(3)} ${generateDigits(3)}-${generateDigits(4)}`
}

/**
 * Generates a random company name
 * @returns Generated company name
 */
export const generateCompanyName = (): string => {
  const prefixes = [
    'Tech',
    'Digital',
    'Global',
    'Smart',
    'Future',
    'Next',
    'Pro',
    'Elite',
  ]
  const suffixes = [
    'Corp',
    'Inc',
    'LLC',
    'Solutions',
    'Systems',
    'Group',
    'Labs',
    'Works',
  ]
  const industries = [
    'Software',
    'Data',
    'Cloud',
    'AI',
    'Mobile',
    'Web',
    'Security',
    'Analytics',
  ]

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  const industry = industries[Math.floor(Math.random() * industries.length)]

  return `${prefix} ${industry} ${suffix}`
}

/**
 * Generates a random deal title
 * @returns Generated deal title
 */
export const generateDealTitle = (): string => {
  const projects = [
    'Website Development',
    'Mobile App',
    'Cloud Migration',
    'Data Analytics',
    'AI Implementation',
    'Security Audit',
    'Digital Transformation',
    'E-commerce Platform',
    'API Integration',
    'Blockchain Solution',
  ]

  return projects[Math.floor(Math.random() * projects.length)]
}

/**
 * Generates a random deal amount
 * @param min - Minimum amount
 * @param max - Maximum amount
 * @returns Generated deal amount
 */
export const generateDealAmount = (
  min: number = 50000,
  max: number = 500000,
): string => {
  const amount = Math.floor(Math.random() * (max - min + 1)) + min
  return `$${amount.toLocaleString()}`
}

/**
 * Generates a random status from a list
 * @param statuses - Array of possible statuses
 * @returns Random status
 */
export const generateStatus = <T>(statuses: readonly T[]): T => {
  return statuses[Math.floor(Math.random() * statuses.length)]
}

/**
 * Generates a random date within a range
 * @param start - Start date
 * @param end - End date
 * @returns Random date
 */
export const generateRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
}

/**
 * Generates a random recent activity
 * @returns Activity object
 */
export const generateRecentActivity = () => {
  const types = ['company', 'contact', 'deal'] as const
  const actions = ['CREATED', 'MODIFIED', 'UPDATED', 'CONVERTED'] as const
  const names = [
    'John Doe',
    'Sarah Wilson',
    'Mike Johnson',
    'Anna Smith',
    'David Brown',
  ]

  const type = generateStatus(types)
  const action = generateStatus(actions)
  const name = generateStatus(names)
  const entity =
    type === 'company'
      ? generateCompanyName()
      : type === 'contact'
        ? name
        : generateDealTitle()

  const date = generateRandomDate(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    new Date(),
  )

  return {
    type: type as 'company' | 'contact' | 'deal',
    action: action as 'CREATED' | 'MODIFIED' | 'UPDATED' | 'CONVERTED',
    description: `${type.charAt(0).toUpperCase() + type.slice(1)} '${entity}' by ${name}`,
    time: formatCompactDate(date),
  }
}

/**
 * Generates a random contact
 * @returns Contact object
 */
export const generateContact = () => {
  const names = [
    'Ana Silva',
    'Carlos Santos',
    'Maria Oliveira',
    'João Costa',
    'Fernanda Lima',
    'Rafael Souza',
    'Juliana Ferreira',
    'Lucas Rodrigues',
    'Camila Alves',
    'Diego Pereira',
  ]

  const name = generateStatus(names)

  return {
    name,
    email: generateEmail(),
    avatar: formatInitials(name),
  }
}

/**
 * Generates a random company
 * @returns Company object
 */
export const generateCompany = () => {
  const name = generateCompanyName()

  return {
    name,
    email: generateEmail(name.toLowerCase().replace(/\s+/g, '')),
    avatar: formatInitials(name),
    industry: generateStatus([
      'Software',
      'Fintech',
      'IoT',
      'AI',
      'Healthcare',
      'Education',
      'Retail',
      'Manufacturing',
    ]),
    employees: generateStatus(['1-10', '11-50', '51-200', '201-500', '500+']),
  }
}

/**
 * Generates a random deal
 * @returns Deal object
 */
export const generateDeal = () => {
  const statuses = [
    'Contract Sent',
    'Waiting on us',
    'Negotiation',
    'Closed Won',
    'Closed Lost',
  ] as const
  const companies = [
    'Apple',
    'Google',
    'Microsoft',
    'Amazon',
    'Meta',
    'Tesla',
    'Netflix',
    'Spotify',
  ]

  return {
    title: generateDealTitle(),
    amount: generateDealAmount(),
    status: generateStatus(statuses) as
      | 'Contract Sent'
      | 'Waiting on us'
      | 'Negotiation'
      | 'Closed Won'
      | 'Closed Lost',
    company: generateStatus(companies),
    email: generateEmail(),
    probability: Math.floor(Math.random() * 101),
  }
}
