'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { Input } from '../ui/input'
import Icon from '../Icon'
import { ArticleTagResponse } from '@/types/tag'
import { toast } from 'sonner'

interface MultiSelectProps {
  options: ArticleTagResponse[]
  selected: string[]
  onChange: (values: string[]) => void
}

export default function MultiTagSelect({
  options,
  selected,
  onChange,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const toggleValue = (value: string) => {
    if (selected.length >= 5) {
      toast.info('最多选择5个标签')
      setOpen(false)
      return
    }
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const filteredOptions = search.trim()
    ? options.filter(o => o.title.toLowerCase().includes(search.toLowerCase()))
    : options

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex gap-2 items-center px-2 py-1 border border-solid border-[#e8e8e8] dark:border-[#2a2a2a] rounded-lg text-[#555666] text-[12px] cursor-pointer hover:bg-[#f4f8fc] hover:text-[#26a2e2] dark:hover:bg-[#1c1f26] dark:hover:text-[#4cb9ff] dark:text-[#d1d5db]">
          <Icon icon="ri:add-line" size={16} />
          <p>添加文章标签</p>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-140 p-3">
        {/* 搜索框 */}
        <Input
          placeholder="搜索标签..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* 标签网格（6列） */}
        <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto mt-4">
          {filteredOptions.map(item => (
            <div
              key={item.id}
              onClick={() => toggleValue(item.title)}
              className={cn(
                'relative px-2 py-1 rounded-md border cursor-pointer text-[12px] flex justify-center items-center text-center select-none',
                selected.includes(item.title)
                  ? 'bg-primary text-white dark:text-black border-primary'
                  : 'hover:bg-accent',
              )}
            >
              <Check
                className={cn(
                  'absolute left-1 h-3 w-3',
                  selected.includes(item.title) ? 'opacity-100' : 'opacity-0',
                )}
              />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
