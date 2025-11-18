'use client'
import { useEffect, useState } from 'react'
import TagCard from '@/components/tag/TagCard'
import { Separator } from '@/components/ui/separator'
import TagArticleCard from '@/components/tag/TagArtilceCard'
import { ArticleInfo, GetArticleInfoParams } from '@/types/article'
import { GetArticleAPI } from '@/api/article'
import { useSearchParams } from 'next/navigation'

export default function TagPage() {
  const initSelectedTitle = useSearchParams().get('title')
  const [selectedTags, setSelectedTags] = useState<string[]>([
    initSelectedTitle || '',
  ])
  const [tagArticles, setTagArticles] = useState<ArticleInfo[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const pageSize = 4
  useEffect(() => {
    const getTagArticleList = async () => {
      const param: GetArticleInfoParams = {
        page: page,
        pageSize: pageSize,
      }
      if (selectedTags.length > 0 && selectedTags[0] != '') {
        // 第二个判断防止不带路径参数时带上tag请求参数
        param.tags = selectedTags
      }
      const res = await GetArticleAPI(param)
      setTagArticles(res.data.data)
      setTotalPages(res.data.totalPages)
    }
    getTagArticleList()
  }, [page, selectedTags])

  const handleSelectedTags = (tag: string) => {
    // 初始化page值
    setPage(1)
    if (tag === '') {
      setSelectedTags([])
      return
    }
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    )
  }

  return (
    <div className="py-6 space-y-5">
      <TagCard
        selectedTags={selectedTags}
        changeSelectedTags={handleSelectedTags}
      />
      <Separator />
      <TagArticleCard
        tagArticleList={tagArticles}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  )
}
