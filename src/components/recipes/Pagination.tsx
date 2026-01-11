'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export function Pagination({ currentPage, totalPages, hasNext, hasPrev }: PaginationProps) {
  const searchParams = useSearchParams()
  
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    const queryString = params.toString()
    return `/recepti${queryString ? `?${queryString}` : ''}`
  }

  if (totalPages <= 1) return null

  // Generate page numbers to show
  const pages: (number | 'ellipsis')[] = []
  const showPages = 5
  
  if (totalPages <= showPages + 2) {
    // Show all pages if not too many
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Show first, last, and pages around current
    pages.push(1)
    
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    
    if (start > 2) pages.push('ellipsis')
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (end < totalPages - 1) pages.push('ellipsis')
    
    pages.push(totalPages)
  }

  return (
    <nav aria-label="Navigacija stranica" className="flex items-center justify-center gap-2 mt-12">
      {/* Previous */}
      {hasPrev ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-4 py-2 text-sm font-medium text-warm-700 bg-white border border-warm-200 rounded-lg hover:bg-warm-50 transition-colors"
          aria-label="Prethodna stranica"
        >
          ← Prethodna
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-warm-400 bg-warm-100 border border-warm-200 rounded-lg cursor-not-allowed">
          ← Prethodna
        </span>
      )}

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center gap-1">
        {pages.map((page, index) => 
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-warm-400">
              ...
            </span>
          ) : page === currentPage ? (
            <span
              key={page}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg"
              aria-current="page"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={createPageUrl(page)}
              className="px-4 py-2 text-sm font-medium text-warm-700 bg-white border border-warm-200 rounded-lg hover:bg-warm-50 transition-colors"
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Mobile page indicator */}
      <span className="sm:hidden px-4 py-2 text-sm text-warm-600">
        {currentPage} / {totalPages}
      </span>

      {/* Next */}
      {hasNext ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-4 py-2 text-sm font-medium text-warm-700 bg-white border border-warm-200 rounded-lg hover:bg-warm-50 transition-colors"
          aria-label="Sljedeća stranica"
        >
          Sljedeća →
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-warm-400 bg-warm-100 border border-warm-200 rounded-lg cursor-not-allowed">
          Sljedeća →
        </span>
      )}
    </nav>
  )
}
