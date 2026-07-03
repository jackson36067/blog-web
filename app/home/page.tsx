'use client'

import ArticlePagination from '@/components/article/ArticlePagination'
import LovePointer from '@/components/Pointer'

export default function ArticlePage() {
  return (
    <div
      className="
  relative flex gap-6 px-4 py-6
  bg-[#f5f7fb]
  dark:bg-[#0f1115]
"
    >
      <LovePointer />
      {/* 左侧主内容 */}
      <ArticlePagination />
      {/* 右侧侧边栏 */}
      {/* <ArticleSiderbar /> */}
    </div>
  )
}
