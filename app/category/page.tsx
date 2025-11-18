'use client'

import { GetArticleAPI } from '@/api/article'
import CategoryArticleCard from '@/components/category/CategoryArticleCard'
import CategoryCard from '@/components/category/CategoryCard'
import { Separator } from '@/components/ui/separator'
import { ArticleInfo } from '@/types/article'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CategoryPage() {
  const [title, setTitle] = useState<string>(
    useSearchParams().get('title') || '',
  )
  const [page, setPage] = useState<number>(1)
  const pageSize = 4
  const [totalPages, setTotalPages] = useState<number>(0)

  const [categoryArticleList, setCategoryArticleList] = useState<ArticleInfo[]>(
    [],
  )
  const handleChangeCategory = (title: string) => {
    setTitle(title)
    // 初始化page值
    setPage(1)
  }

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
  }, [page, pageSize, title])

  return (
    <div className="py-6 space-y-6">
      <CategoryCard title={title} changeTitle={handleChangeCategory} />
      <Separator />
      <CategoryArticleCard
        categoryArticleList={categoryArticleList}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  )
}
