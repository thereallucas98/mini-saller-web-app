/**
 * Currency formatting utilities
 */

/**
 * Formats a number as currency in USD format
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  options: {
    currency?: string
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {},
): string => {
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)
}

/**
 * Formats a large number with K/M/B suffixes
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted string with suffix
 */
export const formatCompactCurrency = (
  amount: number,
  options: {
    currency?: string
    locale?: string
  } = {},
): string => {
  const { currency = 'USD', locale = 'en-US' } = options

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount)
}

/**
 * Converts a currency string to number
 * @param currencyString - Currency string like "$1,234.56"
 * @returns Number value
 */
export const parseCurrency = (currencyString: string): number => {
  return parseFloat(currencyString.replace(/[$,]/g, ''))
}

/**
 * Formats a number with thousand separators
 * @param number - The number to format
 * @param locale - Locale for formatting
 * @returns Formatted number string
 */
export const formatNumber = (
  number: number,
  locale: string = 'en-US',
): string => {
  return new Intl.NumberFormat(locale).format(number)
}
