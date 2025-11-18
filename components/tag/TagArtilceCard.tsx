'use client'

import { ArticleInfo } from '@/types/article'
import ArticleList from '../ArticleList'

interface TagArticleCardProps {
  tagArticleList: ArticleInfo[]
  page: number
  totalPages: number
  setPage: (page: number) => void
}

export default function TagArticleCard({
  tagArticleList,
  page,
  totalPages,
  setPage,
}: TagArticleCardProps) {
  return (
    <div className="py-2 px-4 bg-white dark:bg-[#212121]">
      <ArticleList
        articleList={tagArticleList}
        page={page}
        totalPage={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}
