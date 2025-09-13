/**
 * Date formatting utilities
 */

/**
 * Formats a date to a readable string
 * @param date - Date object or string
 * @param options - Formatting options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string,
  options: {
    locale?: string
    format?: 'short' | 'medium' | 'long' | 'full'
    includeTime?: boolean
  } = {},
): string => {
  const { locale = 'en-US', format = 'medium', includeTime = false } = options

  const dateObj = typeof date === 'string' ? new Date(date) : date

  const formatOptions: Intl.DateTimeFormatOptions = {
    ...(format === 'short' && {
      month: 'short',
      day: 'numeric',
      ...(includeTime && { hour: 'numeric', minute: '2-digit' }),
    }),
    ...(format === 'medium' && {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      ...(includeTime && { hour: 'numeric', minute: '2-digit' }),
    }),
    ...(format === 'long' && {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      ...(includeTime && { hour: 'numeric', minute: '2-digit' }),
    }),
    ...(format === 'full' && {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }),
  }

  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj)
}

/**
 * Formats a date to relative time (e.g., "2 hours ago")
 * @param date - Date object or string
 * @param locale - Locale for formatting
 * @returns Relative time string
 */
export const formatRelativeTime = (
  date: Date | string,
  locale: string = 'en-US',
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second')
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute')
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour')
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day')
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month')
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year')
  }
}

/**
 * Formats a date to a compact format (e.g., "Mar 15, 07AM")
 * @param date - Date object or string
 * @returns Compact date string
 */
export const formatCompactDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(dateObj)
}

/**
 * Gets the start of day for a given date
 * @param date - Date object or string
 * @returns Date object at start of day
 */
export const getStartOfDay = (date: Date | string): Date => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const startOfDay = new Date(dateObj)
  startOfDay.setHours(0, 0, 0, 0)
  return startOfDay
}

/**
 * Gets the end of day for a given date
 * @param date - Date object or string
 * @returns Date object at end of day
 */
export const getEndOfDay = (date: Date | string): Date => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const endOfDay = new Date(dateObj)
  endOfDay.setHours(23, 59, 59, 999)
  return endOfDay
}
