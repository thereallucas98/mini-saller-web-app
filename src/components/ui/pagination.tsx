import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from './button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) => {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <div
      className={`flex items-center justify-center space-x-1 sm:space-x-2 ${className}`}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center text-xs sm:text-sm"
      >
        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="ml-1 hidden sm:inline">Previous</span>
      </Button>

      <div className="flex items-center space-x-1">
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-2 py-2 text-xs text-base-gray-400 sm:text-sm">
                ...
              </span>
            ) : (
              <Button
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page as number)}
                className="min-w-[32px] text-xs sm:min-w-[40px] sm:text-sm"
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center text-xs sm:text-sm"
      >
        <span className="mr-1 hidden sm:inline">Next</span>
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </div>
  )
}
