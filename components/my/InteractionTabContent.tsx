'use client'

import { InteractionTab } from '@/constants/tab'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Pagination from '../Pagination'
import FollowedTabContent from './follow/FollowedTabContent'
import FansTabContent from './follow/FansTabContent'
import CommentTabContent from './comment/CommentTabContent'
import { UserData } from '@/types/user'
import useUserStore from '@/stores/UserStore'

export default function InteractionTabContent({
  userData,
}: {
  userData: UserData | null
}) {
  const [activeTab, setActiveTab] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPagte] = useState<number>(0)
  const pageSize = 6
  const { userInfo } = useUserStore()

  const displayFlags = [
    userData?.publicFollowList,
    userData?.publicFanList,
    true,
    true,
  ]
  useEffect(() => {
    if (userData?.publicFollowList) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(1)
      return
    }
    if (userData?.publicFanList) {
      setActiveTab(2)
    }
  }, [userData])
  return (
    <div>
      <div className="flex gap-10 items-center py-3 text-gray-500 dark:text-white text-[14px] border-b border-solid border-gray-200 dark:border-gray-200/10">
        {InteractionTab.map(item => {
          if (
            !displayFlags[item.id - 1] &&
            userData?.username != userInfo.username
          )
            return null
          return (
            <p
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setPage(1)
                setTotalPagte(0)
              }}
              className={cn(
                activeTab === item.id && 'text-[#fc5531]',
                'cursor-pointer',
              )}
            >
              {item.title}
            </p>
          )
        })}
      </div>
      <div>
        {activeTab === 1 && (
          <FollowedTabContent
            page={page}
            pageSize={pageSize}
            setTotalPage={setTotalPagte}
          />
        )}
        {activeTab === 2 && (
          <FansTabContent
            page={page}
            pageSize={pageSize}
            setTotalPage={setTotalPagte}
          />
        )}
        {activeTab === 3 && (
          <CommentTabContent
            page={page}
            pageSize={pageSize}
            setTotalPage={setTotalPagte}
            type="out"
          />
        )}
        {activeTab === 4 && (
          <CommentTabContent
            page={page}
            pageSize={pageSize}
            setTotalPage={setTotalPagte}
            type="in"
          />
        )}
      </div>
      {totalPage > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
