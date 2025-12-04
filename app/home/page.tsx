'use client'

import ArticlePagination from '@/components/article/ArticlePagination'
import ArticleSiderbar from '@/components/article/ArticleSiderbar'
import LovePointer from '@/components/Pointer'

export default function ArticlePage() {
  return (
    <div
      className="
  relative flex gap-6 py-6 pr-4
  bg-linear-to-br from-white to-[#f5f7fa]
  before:absolute before:inset-0 
  before:bg-[linear-gradient(#00000008_1px,transparent_1px),linear-gradient(90deg,#00000008_1px,transparent_1px)]
  before:bg-size-[40px_40px] before:pointer-events-none
  dark:bg-linear-to-br dark:from-[#0c0c0c] dark:via-[#0f0f0f] dark:to-[#111]
  dark:before:bg-[linear-gradient(#ffffff0a_1px,transparent_1px),linear-gradient(90deg,#ffffff0a_1px,transparent_1px)]
  dark:after:absolute dark:after:top-[10%] dark:after:left-[5%]
  dark:after:w-[200px] dark:after:h-[200px]
  dark:after:bg-cyan-500/20 dark:after:blur-[120px] dark:after:rounded-full
"
    >
      <LovePointer />
      {/* 左侧主内容 */}
      <ArticlePagination />
      {/* 右侧侧边栏 */}
      <ArticleSiderbar />
    </div>
  )
}
