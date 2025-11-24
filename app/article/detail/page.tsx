'use client'

import { GetArticleDetailAPI } from '@/api/article'
import ArticleDetailCard from '@/components/article/detail/ArticleDetailCard'
import useUserStore from '@/stores/UserStore'
import { ArticleInfo } from '@/types/article'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function ArticleDetailPage() {
  const articleId = useSearchParams().get('articleId')
  const [artilceDetailInfo, setArticleDetailInfo] =
    useState<ArticleInfo | null>(null)
  const { userInfo } = useUserStore()

  const getArticleDetail = useCallback(async () => {
    const res = await GetArticleDetailAPI(Number(articleId))
    setArticleDetailInfo(res.data)
  }, [articleId])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getArticleDetail()
  }, [articleId, getArticleDetail, userInfo.userId])
  return (
    <div className="py-6">
      <ArticleDetailCard
        articleInfo={artilceDetailInfo}
        reFreshArticleInfoAction={getArticleDetail}
      />
    </div>
  )
}
