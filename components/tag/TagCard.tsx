'use client'

import { GetArticleTagListAPI } from '@/api/tag'
import { ArticleTagResponse } from '@/types/tag'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Icon from '../Icon'

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
          <div key={tag.id} className="relative">
            <Button
              variant={isActive ? 'default' : 'outline'}
              onClick={() => toggleTag(tag.title)}
              className="rounded-full px-4 transition cursor-pointer"
            >
              {tag.title}
            </Button>
            {tag.browseCount > 10000 && (
              <Icon
                icon="noto:fire"
                className="absolute right-0 -top-1.5"
                size={18}
              />
            )}
          </div>
        )
      })}
      {selectedTags.length > 0 && (
        <Button
          variant="ghost"
          onClick={() => toggleTag('')}
          className="text-muted-foreground"
        >
          清空
        </Button>
      )}
    </div>
  )
}
