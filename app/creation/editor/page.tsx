'use client'

import { GetArticleDetailAPI, UpdateArticleAPI } from '@/api/article'
import { GetArticleTagListAPI } from '@/api/tag'
import CreationTemplate from '@/components/creation/Template'
import { CreateArticleParams } from '@/types/article'
import { ArticleTagResponse } from '@/types/tag'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CreationEditorPage() {
  const router = useRouter()
  const articleId = useSearchParams().get('id')
  const [artilceTags, setArticleTags] = useState<ArticleTagResponse[]>([])
  const [articleInfo, setArticleInfo] = useState<CreateArticleParams>({
    title: '',
    abstract: '',
    content: '',
    categoryName: '',
    tags: [],
    status: 3, // 默认为发布
    visibility: 0, // 默认为所有人可见
    publicComment: true, // 默认公开评论
  })

  useEffect(() => {
    if (!articleId) return
    const getArticelDetailInfo = async () => {
      const res = await GetArticleDetailAPI(Number(articleId))
      const data = res.data
      setArticleInfo({
        title: data.title ?? '',
        abstract: data.abstract ?? '',
        content: data.content ?? '',
        categoryName: data.categoryName ?? '',
        tags: data.tags ?? [],
        coverage: data.coverage ?? '',
        status: data.status ?? 1,
        visibility: data.visibility ?? 0,
        publicComment: data.publicComment ?? true,
      })
    }
    getArticelDetailInfo()
  }, [articleId])

  // 获取文章标签列表
  useEffect(() => {
    const getArtilceTags = async () => {
      const res = await GetArticleTagListAPI()
      setArticleTags(res.data)
    }
    getArtilceTags()
  }, [])

  // 更新文章内容以及基础信息
  const publishArticle = async () => {
    await UpdateArticleAPI(Number(articleId), articleInfo)
    setTimeout(() => {
      router.push(`/article/detail?articleId=${articleId}`)
    }, 200)
  }
  return (
    <CreationTemplate
      articleInfo={articleInfo}
      articleTags={artilceTags}
      handleUpdateArticleInfoAction={(
        title,
        abstract,
        tags,
        categoryName,
        coverage,
        visibility,
        publicComment,
      ) => {
        setArticleInfo(prev => ({
          ...prev,
          title,
          abstract,
          tags,
          categoryName,
          coverage,
          visibility,
          publicComment,
        }))
      }}
      handleUpdateArticleContentAction={(content, addType) =>
        setArticleInfo(prev => {
          if (addType === 1) {
            return { ...prev, content: prev.content + content }
          }
          return { ...prev, content }
        })
      }
      handlePublishArticleAction={publishArticle}
      showDraftButton={false}
    />
  )
}
