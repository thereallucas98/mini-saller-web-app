/**
 * Text formatting utilities
 */

/**
 * Capitalizes the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Capitalizes each word in a string
 * @param str - String to capitalize
 * @returns Title case string
 */
export const capitalizeWords = (str: string): string => {
  if (!str) return str
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ')
}

/**
 * Truncates text to a specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated text
 */
export const truncateText = (
  text: string,
  maxLength: number,
  suffix: string = '...',
): string => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength - suffix.length) + suffix
}

/**
 * Formats initials from a name
 * @param name - Full name
 * @param maxInitials - Maximum number of initials (default: 2)
 * @returns Initials string
 */
export const formatInitials = (
  name: string,
  maxInitials: number = 2,
): string => {
  if (!name) return ''

  const words = name.trim().split(' ')
  const initials = words
    .slice(0, maxInitials)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')

  return initials
}

/**
 * Formats a phone number
 * @param phone - Phone number string
 * @param format - Format type ('us' | 'international')
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (
  phone: string,
  format: 'us' | 'international' = 'us',
): string => {
  if (!phone) return phone

  const cleaned = phone.replace(/\D/g, '')

  if (format === 'us' && cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }

  if (format === 'international' && cleaned.length >= 10) {
    return `+${cleaned.slice(0, cleaned.length - 10)} ${cleaned.slice(-10, -7)} ${cleaned.slice(-7, -4)}-${cleaned.slice(-4)}`
  }

  return phone
}

/**
 * Formats an email address (masks for display)
 * @param email - Email address
 * @param mask - Whether to mask the email
 * @returns Formatted email
 */
export const formatEmail = (email: string, mask: boolean = false): string => {
  if (!email) return email

  if (!mask) return email

  const [localPart, domain] = email.split('@')
  if (!localPart || !domain) return email

  const maskedLocal =
    localPart.length > 2
      ? `${localPart.slice(0, 2)}${'*'.repeat(localPart.length - 2)}`
      : localPart

  return `${maskedLocal}@${domain}`
}

/**
 * Formats a file size in bytes to human readable format
 * @param bytes - Size in bytes
 * @param decimals - Number of decimal places
 * @returns Formatted file size
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
