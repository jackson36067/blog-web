'use client'
import { useState } from 'react'
import TagCard from '@/components/tag/TagCard'
import { Separator } from '@/components/ui/separator'
import TagArticleCard from '@/components/tag/TagArtilceCard'

export default function TagPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSelectedTags = (tag: string) => {
    if (tag === '') {
      setSelectedTags([])
    }
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    )
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-5">
      <TagCard
        selectedTags={selectedTags}
        changeSelectedTags={handleSelectedTags}
      />
      <Separator />
      <TagArticleCard selectedTags={selectedTags} />
    </div>
  )
}
