'use client'

import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // 生成页码逻辑
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      const startPage = Math.max(1, currentPage - 2)
      const endPage = Math.min(totalPages, currentPage + 2)

      if (startPage > 1) {
        pages.push(1)
        if (startPage > 2) pages.push('...')
      }

      for (let i = startPage; i <= endPage; i++) pages.push(i)

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handleClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page)
    }
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {/* 上一页 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'px-3 py-1 rounded-md border text-gray-700 hover:bg-gray-100 transition',
          'border-gray-300 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800',
          currentPage === 1 && 'opacity-50 cursor-not-allowed',
        )}
      >
        上一页
      </button>

      {/* 页码 */}
      {getPageNumbers().map((page, idx) => (
        <button
          key={idx}
          onClick={() => handleClick(page)}
          disabled={page === '...'}
          className={cn(
            'px-3 py-1 rounded-md border text-sm transition',
            'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
            page === currentPage &&
              'bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600 hover:text-gray-700',
            page === '...' && 'cursor-default',
          )}
        >
          {page}
        </button>
      ))}

      {/* 下一页 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'px-3 py-1 rounded-md border text-gray-700 hover:bg-gray-100 transition',
          'border-gray-300 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800',
          currentPage === totalPages && 'opacity-50 cursor-not-allowed',
        )}
      >
        下一页
      </button>
    </div>
  )
}
