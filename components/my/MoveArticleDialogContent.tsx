'use client'

import { FavoriteInfo } from '@/types/favorite'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface MoveArticleDialogContentProps {
  favoriteList: FavoriteInfo[]
  selectMoveFavorite: (favoriteId: number) => void
}
export const MoveArticleDialogContent = ({
  favoriteList,
  selectMoveFavorite,
}: MoveArticleDialogContentProps) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-[14px] text-gray-500">移动到</p>
      <Select onValueChange={value => selectMoveFavorite(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder="请选择移动的收藏夹"
            className="placeholder:text-gray-500"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {favoriteList.map(item => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
