'use client'

import { ArticleInfo } from '@/types/article'
import ArticleList from '../ArticleList'

interface CategoryArticleCardProps {
  categoryArticleList: ArticleInfo[]
  page: number
  setPage: (page: number) => void
  totalPages: number
}

export default function CategoryArticleCard({
  categoryArticleList,
  page,
  setPage,
  totalPages,
}: CategoryArticleCardProps) {
  return (
    <div className="py-2 px-4 bg-white dark:bg-[#212121] ">
      <ArticleList
        articleList={categoryArticleList}
        page={page}
        totalPage={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}
