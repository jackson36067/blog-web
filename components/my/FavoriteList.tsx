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
import { MoveFavoriteArticlesAPI } from '@/api/favorite'

interface FavoriteListProps {
  favoriteList: FavoriteInfo[]
  selectedFavorite: FavoriteInfo | undefined
  reGetFavoriteList: () => void
  changeSelectedFavorite: (favorite: FavoriteInfo) => void
  reGetFavoriteArticleList: () => void
}

export default function FavoriteList({
  favoriteList,
  selectedFavorite,
  reGetFavoriteList,
  changeSelectedFavorite,
  reGetFavoriteArticleList,
}: FavoriteListProps) {
  const [open, setOpen] = useState<boolean>(false)
  // 关闭新建收藏夹弹窗
  const handleCloseNewFavoriteDialog = () => {
    setOpen(false)
    // 重新获取收藏夹列表
    reGetFavoriteList()
  }
  // 点击收藏夹选择收藏夹
  const handleSelectFavorite = (favorite: FavoriteInfo) => {
    changeSelectedFavorite(favorite)
  }
  // 鼠标拖拽经过收藏夹
  const handleDragOverFavorite = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  // 鼠标拖拽停止在收藏夹
  const handleDropOnFavorite = async (
    e: React.DragEvent<HTMLDivElement>,
    targetFavoriteId: number,
  ) => {
    e.preventDefault()
    const data = JSON.parse(e.dataTransfer.getData('text/plain'))
    // 调用移动收藏夹博文函数
    await MoveFavoriteArticlesAPI({
      sourceFavoriteId: selectedFavorite!.id,
      targetFavoriteId: targetFavoriteId,
      articleIds: [data.articleId],
    })
    // 重新获取收藏夹列表
    reGetFavoriteList()
    // 重新获取收藏夹博文列表
    reGetFavoriteArticleList()
  }
  return (
    <div className="w-50 h-full border-r border-solid border-gray-200 dark:border-gray-200/10">
      {open && <div className="fixed inset-0 bg-black/50 z-40" />}
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogTrigger className="w-full">
          <div className="flex gap-2 items-center w-full py-5 px-2 hover:bg-[#f6f7f8] dark:hover:bg-[#0a0a0a]/40 hover:rounded-[2px] text-gray-500 border-b border-solid border-gray-200 dark:border-gray-200/10 text-[16px] cursor-pointer">
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
              'flex gap-2 items-center w-full pb-8 pt-2 px-2 hover:bg-[#f6f7f8] dark:hover:bg-gray-600/40 hover:rounded-[2px] text-gray-500 border-b border-solid border-gray-200 dark:border-gray-200/10 text-[16px] cursor-pointer relative',
              selectedFavorite &&
                selectedFavorite.id === item.id &&
                'bg-[#f6f7f8] dark:bg-[#0a0a0a]/40',
            )}
            onClick={() => handleSelectFavorite(item)}
            onDragOver={e => handleDragOverFavorite(e)}
            onDrop={e => handleDropOnFavorite(e, item.id)}
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
