'use client'

import { GetArticleAPI } from '@/api/article'
import { ArticleInfo } from '@/types/article'
import { useEffect, useState } from 'react'
import ArticleList from '../ArticleList'

interface TagArticleCardProps {
  selectedTags: string[]
}

export default function TagArticleCard({ selectedTags }: TagArticleCardProps) {
  const [tagArticles, setTagArticles] = useState<ArticleInfo[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const pageSize = 4
  useEffect(() => {
    const getTagArticleList = async () => {
      const res = await GetArticleAPI({
        page: page,
        pageSize: pageSize,
        tags: selectedTags,
      })
      setTagArticles(res.data.data)
      setTotalPages(res.data.totalPages)
    }
    getTagArticleList()
  }, [page, selectedTags])
  return (
    <div className="py-2 px-4 bg-white dark:bg-[#212121] ">
      <ArticleList
        articleList={tagArticles}
        page={page}
        totalPage={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}
