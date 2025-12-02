'use client'

import { PublishArticleAPI } from '@/api/article'
import { GetArticleTagListAPI } from '@/api/tag'
import CreationTemplate from '@/components/creation/Template'
import { CreateArticleParams } from '@/types/article'
import { ArticleTagResponse } from '@/types/tag'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CreationPage() {
  const [artilceTags, setArticleTags] = useState<ArticleTagResponse[]>([])
  const [createArticleInfo, setCreateArticleInfo] =
    useState<CreateArticleParams>({
      title: '',
      abstract: '',
      content: '',
      categoryName: '',
      tags: [],
      status: 1, // 默认为草稿
      visibility: 0, // 默认为所有人可见
      publicComment: true, // 默认公开评论
    })
  const router = useRouter()

  // 获取文章标签列表
  useEffect(() => {
    const getArtilceTags = async () => {
      const res = await GetArticleTagListAPI()
      setArticleTags(res.data)
    }
    getArtilceTags()
  }, [])

  // 点击存为草稿/发布文章执行的函数
  const publishArticle = async (status: number) => {
    const newData = {
      ...createArticleInfo,
      status,
    }
    const res = await PublishArticleAPI(newData)
    setTimeout(() => {
      router.push(`/article/detail?articleId=${res.data}`)
    }, 200)
  }

  return (
    <div className="w-full">
      <CreationTemplate
        articleInfo={createArticleInfo}
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
          setCreateArticleInfo(prev => ({
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
          setCreateArticleInfo(prev => {
            if (addType === 1) {
              return { ...prev, content: prev.content + content }
            }
            return { ...prev, content }
          })
        }
        handlePublishArticleAction={publishArticle}
      />
    </div>
  )
}
