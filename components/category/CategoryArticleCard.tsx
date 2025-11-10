'use client'

import { ArticleInfo } from '@/types/article'
import { useEffect, useState } from 'react'
import { GetArticleAPI } from '@/api/article'
import ArticleList from '../ArticleList'

interface CategoryArticleCardProps {
  title: string
}

export default function CategoryArticleCard({
  title,
}: CategoryArticleCardProps) {
  const [categoryArticleList, setCategoryArticleList] = useState<ArticleInfo[]>(
    [],
  )
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const pageSize = 4
  useEffect(() => {
    const getCategoryArticleList = async () => {
      const res = await GetArticleAPI({
        page,
        pageSize,
        categoryTitle: title || '',
      })
      setCategoryArticleList(res.data.data)
      setTotalPages(res.data.totalPages)
    }
    getCategoryArticleList()
  }, [page, title])
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
