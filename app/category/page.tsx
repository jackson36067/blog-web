'use client'

import CategoryArticleCard from '@/components/category/CategoryArticleCard'
import CategoryCard from '@/components/category/CategoryCard'
import { Separator } from '@/components/ui/separator'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function CategoryPage() {
  const [title, setTitle] = useState<string>(
    useSearchParams().get('title') || '',
  )
  return (
    <div className="max-w-[1400px] mx-auto py-6 space-y-6">
      <CategoryCard title={title} changeTitle={setTitle} />
      <Separator />
      <CategoryArticleCard title={title} />
    </div>
  )
}
