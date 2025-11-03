'use client'

import { BrowseArticleHistoryGroup } from '@/types/article'
import { Timeline } from './Timeline'
import { useCallback, useEffect, useState } from 'react'
import { GetUserBrowseHistoryAPI } from '@/api/user'
import { ClearUserBrowseHistoryAPI } from '@/api/article'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'
import { DialogHeader, DialogFooter } from '../ui/dialog'

export default function RecentBrowseTabContent() {
  const [browseArticles, setBrowseArticles] = useState<
    BrowseArticleHistoryGroup[]
  >([])
  const [open, setOpen] = useState<boolean>(false)
  const getBrowseArticleHistory = useCallback(async () => {
    const res = await GetUserBrowseHistoryAPI()
    setBrowseArticles(res.data)
  }, [])
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBrowseArticleHistory()
  }, [getBrowseArticleHistory])

  const handleClearUserBrowseHistroy = async () => {
    await ClearUserBrowseHistoryAPI()
    getBrowseArticleHistory()
  }
  return (
    <div className="relative mt-4">
      {open && <div className="fixed inset-0 bg-black/50 z-40" />}
      {browseArticles.length > 0 ? (
        <div>
          <Dialog modal={false} open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="absolute right-0 top-0 border border-solid border-gray-500 py-1 px-3 text-[12px] text-gray-500 rounded-[20px] z-50">
                清空历史
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>你确定要清除历史记录吗?</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <button
                  className="border px-3 py-1 rounded"
                  onClick={() => setOpen(false)}
                >
                  取消
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={handleClearUserBrowseHistroy}
                >
                  确定
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Timeline groups={browseArticles} />
        </div>
      ) : (
        <a className="flex items-center justify-center px-30 py-4 mt-20 text-[14px] text-[#1d98d1] font-bold">
          近期没有浏览记录
        </a>
      )}
    </div>
  )
}
