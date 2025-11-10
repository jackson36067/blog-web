'use client'

import { GetArticleAPI } from '@/api/article'
import { ArticleInfo, GetArticleInfoParams } from '@/types/article'
import { useEffect, useState } from 'react'
import SearchInput from '../SearchInput'
import ArticleList from '../ArticleList'

export default function ArticlePagination() {
  const [articleInfo, setArticleInfo] = useState<ArticleInfo[]>([])
  const [totalPages, setTotalPages] = useState<number>(5)
  const [title, setTitle] = useState<string>('')
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    const getHomeArtilceList = async () => {
      const params: GetArticleInfoParams = {
        page,
        pageSize: 5,
      }

      if (title !== '') {
        params.title = title
      }
      const res = await GetArticleAPI(params)
      setArticleInfo(res.data.data)
      setTotalPages(res.data.totalPages)
    }
    getHomeArtilceList()
  }, [page, title])
  return (
    <div className="flex-1 space-y-6">
      {/* 文章列表 */}
      <div className="bg-white dark:bg-[#212121] shadow rounded-lg p-3">
        <div className="flex justify-between items-center border-b border-solid border-b-gray-200 pb-4">
          <p className="font-bold text-[16px]">文章列表</p>
          <SearchInput value={title} onValueChange={setTitle} />
        </div>
        <ArticleList
          articleList={articleInfo}
          page={page}
          totalPage={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
