'use client'

import NewFavoriteDialogContent from '@/components/my/NewFavoriteDialogContent'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import useUserStore from '@/stores/UserStore'
import { FavoriteInfo } from '@/types/favorite'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CollectFavoriteDialogContent({
  articleId,
  userFavorites,
  handleCollectArticleAction,
  handelNewFavoriteAction,
}: {
  articleId: number
  userFavorites: FavoriteInfo[]
  handleCollectArticleAction: (item: FavoriteInfo) => void
  handelNewFavoriteAction: () => void
}) {
  const [open, setOpen] = useState(false)
  const { userInfo } = useUserStore()
  const handleDialogOpenChange = (open: boolean) => {
    if (userInfo.userId === 0 && open) {
      toast.info('请先登录!')
      return
    }
    setOpen(open)
  }
  // 新建收藏夹
  const handelNewFavorite = () => {
    handelNewFavoriteAction()
    setOpen(false)
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogTrigger className="w-full">
          <div className="flex items-center gap-2 w-full bg-[#fafafa] dark:bg-[#2a2a2a] p-2 rounded-xl cursor-pointer text-[#555666] dark:text-gray-300">
            <Image
              src="/images/add.png"
              alt=""
              width={4}
              height={4}
              className="w-4 h-4"
            />
            <p>创建收藏夹</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建收藏夹</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <NewFavoriteDialogContent
            operateType="add"
            closeNewFavoriteDialog={handelNewFavorite}
          />
        </DialogContent>
      </Dialog>

      <div className="my-6">
        {userFavorites.map(item => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between px-3 py-2 border-b border-b-solid border-b-gray-200 dark:border-b-gray-200/20 text-[#555666] dark:text-gray-300 cursor-pointer hover:bg-[#f5f6f7] dark:hover:bg-[#212121]"
            >
              <div>
                <p>{item.title}</p>
                <p className="text-[12px] mt-2">{item.articleCount}条内容</p>
              </div>
              <div
                className={cn(
                  'px-3 py-1 border border-solid border-gray-200 dark:border-gray-200/20 rounded-[20px]',
                  item.collectArticleIdList.includes(articleId) &&
                    'bg-[#f8f8fa] dark:bg-[#212121]',
                )}
                onClick={() => handleCollectArticleAction(item)}
              >
                {item.collectArticleIdList.includes(articleId)
                  ? '已收藏'
                  : '收藏'}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
