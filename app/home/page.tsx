'use client'

import ArticlePagination from '@/components/article/ArticlePagination'
import ArticleSiderbar from '@/components/article/ArticleSiderbar'
import LovePointer from '@/components/Pointer'

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-[#f0eeee] dark:bg-[#0a0a0a] p-6">
      <div className="max-w-[1200px] mx-auto flex gap-6">
        {/* 爱心光标 */}
        <LovePointer />
        {/* 左侧主内容 */}
        <ArticlePagination />
        {/* 右侧侧边栏 */}
        <ArticleSiderbar />
      </div>
    </div>
  )
}
