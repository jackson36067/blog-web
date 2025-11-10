'use client'

import { GetCategoryListAPI } from '@/api/category'
import { CategoryInfo } from '@/types/category'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface CategoryCardProps {
  title: string
  changeTitle: (title: string) => void
}

export default function CategoryCard({
  title,
  changeTitle,
}: CategoryCardProps) {
  // 分类列表
  const [categoryList, setCategoryList] = useState<CategoryInfo[]>([])
  useEffect(() => {
    const getCategoryList = async () => {
      const res = await GetCategoryListAPI()
      setCategoryList(res.data)
    }
    getCategoryList()
  }, [])
  return (
    <div className="w-full py-2 rounded-sm">
      <div className="flex items-center gap-10">
        {categoryList.map(item => {
          return (
            <Button
              key={item.id}
              variant={
                title != null && title === item.title ? 'default' : 'outline'
              }
              className="rounded-full px-4 transition"
              onClick={() => {
                changeTitle(item.title)
              }}
            >
              {item.title}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
