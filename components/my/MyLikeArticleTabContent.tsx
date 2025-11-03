'use client'

import { GetUserLikeArticleListAPI } from '@/api/user'
import { ArticleInfo } from '@/types/article'
import { useEffect, useState } from 'react'
import Pagination from '../Pagination'
import Article from '../Article'

export default function MyLikeArticleTabContent() {
  const [totalPages, setTotalPages] = useState<number>(5)
  const [page, setPage] = useState<number>(1)
  const [likeArticles, setLikeArtilces] = useState<ArticleInfo[]>([])
  useEffect(() => {
    const getUserLikeArticleList = async () => {
      const res = await GetUserLikeArticleListAPI({ page: page, pageSize: 4 })
      setLikeArtilces(res.data.data)
      setTotalPages(res.data.totalPages)
    }
    getUserLikeArticleList()
  }, [page])
  return (
    <div>
      {likeArticles.length > 0 ? (
        <div>
          {likeArticles.map(item => {
            return <Article key={item.id} articleInfo={item} />
          })}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      ) : (
        <a className="flex items-center justify-center px-2 py-4 mt-20 text-[14px] text-[#1d98d1] font-bold cursor-pointer">
          暂无文章, 快去创作吧
        </a>
      )}
    </div>
  )
}
