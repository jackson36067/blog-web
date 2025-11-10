'use client'

import { GetArticleTagListAPI } from '@/api/tag'
import { ArticleTagResponse } from '@/types/tag'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface TagCardProps {
  selectedTags: string[]
  changeSelectedTags: (tag: string) => void
}

export default function TagCard({
  selectedTags,
  changeSelectedTags,
}: TagCardProps) {
  const [allTags, setAllTags] = useState<ArticleTagResponse[]>([])

  useEffect(() => {
    const getArticleTagList = async () => {
      const res = await GetArticleTagListAPI()
      setAllTags(res.data)
    }
    getArticleTagList()
  }, [])

  const toggleTag = (tag: string) => {
    changeSelectedTags(tag)
  }
  return (
    <div className="flex flex-wrap gap-3">
      {allTags.map(tag => {
        const isActive = selectedTags.includes(tag.title)
        return (
          <Button
            key={tag.id}
            variant={isActive ? 'default' : 'outline'}
            onClick={() => toggleTag(tag.title)}
            className="rounded-full px-4 transition"
          >
            {tag.title}
          </Button>
        )
      })}
      {selectedTags.length > 0 && (
        <Button
          variant="ghost"
          onClick={() => changeSelectedTags('')}
          className="text-muted-foreground"
        >
          清空
        </Button>
      )}
    </div>
  )
}
