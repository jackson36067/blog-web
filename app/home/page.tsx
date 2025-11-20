'use client'

import ArticlePagination from '@/components/article/ArticlePagination'
import ArticleSiderbar from '@/components/article/ArticleSiderbar'

export default function ArticlePage() {
  return (
    <div className="flex gap-6 py-6">
      {/* 左侧主内容 */}
      <ArticlePagination />
      {/* 右侧侧边栏 */}
      <ArticleSiderbar />
    </div>
  )
}
