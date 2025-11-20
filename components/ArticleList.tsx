'use client'

import { ArticleInfo } from '@/types/article'
import Article from './Article'
import Pagination from './Pagination'

interface ArticleListProps {
  page: number
  totalPage: number
  onPageChange: (page: number) => void
  articleList: ArticleInfo[]
}

export default function ArticleList({
  articleList,
  page,
  totalPage,
  onPageChange,
}: ArticleListProps) {
  return (
    <div className="w-full">
      {articleList.length > 0 ? (
        <div>
          {articleList.map(item => {
            return (
              <Article
                articleInfo={item}
                key={item.id}
                className="border border-solid border-gray-200 dark:border-gray-200/20 p-2"
                showAuthor
              />
            )
          })}
          {totalPage > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPage}
              onPageChange={onPageChange}
            />
          )}
        </div>
      ) : (
        <div className="w-full flex justify-center py-30 text-[#1d98d1]">
          该分类暂无文章
        </div>
      )}
    </div>
  )
}
