'use client'

import { FavoriteInfo } from '@/types/favorite'
import Icon from '../Icon'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import NewFavoriteDialogContent from './NewFavoriteDialogContent'
import { useState } from 'react'

interface FavoriteListProps {
  favoriteList: FavoriteInfo[]
  selectedFavorite: FavoriteInfo | undefined
  reGetFavoriteList: () => void
  changeSelectedFavorite: (favorite: FavoriteInfo) => void
}

export default function FavoriteList({
  favoriteList,
  selectedFavorite,
  reGetFavoriteList,
  changeSelectedFavorite,
}: FavoriteListProps) {
  const [open, setOpen] = useState<boolean>(false)
  const handleCloseNewFavoriteDialog = () => {
    setOpen(false)
    reGetFavoriteList()
  }
  const handleSelectFavorite = (favorite: FavoriteInfo) => {
    changeSelectedFavorite(favorite)
  }
  return (
    <div className="w-50 h-full border-r border-solid border-gray-200">
      {open && <div className="fixed inset-0 bg-black/50 z-40" />}
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogTrigger className="w-full">
          <div className="flex gap-2 items-center w-full py-5 px-2 hover:bg-[#f6f7f8] dark:hover:bg-[#0a0a0a]/40 hover:rounded-[2px] text-gray-500 border-b border-solid border-gray-200 text-[16px] cursor-pointer">
            <Icon icon="mingcute:new-folder-line" size={14} />
            <p>新建收藏夹</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建收藏夹</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <NewFavoriteDialogContent
            closeNewFavoriteDialog={handleCloseNewFavoriteDialog}
            operateType="add"
          />
        </DialogContent>
      </Dialog>
      {favoriteList.map(item => {
        return (
          <div
            key={item.id}
            className={cn(
              'flex gap-2 items-center w-full pb-8 pt-2 px-2 hover:bg-[#f6f7f8] dark:hover:bg-gray-600/40 hover:rounded-[2px] text-gray-500 border-b border-solid border-gray-200 text-[16px] cursor-pointer relative',
              selectedFavorite &&
                selectedFavorite.id === item.id &&
                'bg-[#f6f7f8] dark:bg-[#0a0a0a]/40',
            )}
            onClick={() => handleSelectFavorite(item)}
          >
            <Icon icon="mingcute:new-folder-line" size={14} />
            <p>{item.title}</p>
            <div className="absolute right-2 bottom-1 flex gap-2 items-center text-[12px]">
              <Icon icon="material-symbols-light:article-outline" size={14} />
              <p>{item.articleCount}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
