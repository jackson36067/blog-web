'use client'

import { InteractionTab } from '@/constants/tab'
import { cn } from '@/lib/utils'
import { UserListResponse } from '@/types/user'
import { useEffect, useState } from 'react'
import UserCard from '../UserCard'
import { GetUserFollowedListAPI, UpdateFollowAPI } from '@/api/user'
import { useSearchParams } from 'next/navigation'
import Pagination from '../Pagination'

export default function InteractionTabContent() {
  const pathParam = useSearchParams()
  const [activeTab, setActiveTab] = useState<number>(1)
  const [userList, setUserList] = useState<UserListResponse[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPagte] = useState<number>(0)
  const pageSize = 6
  useEffect(() => {
    if (activeTab === 1) {
      const getUserFollowed = async () => {
        const res = await GetUserFollowedListAPI({
          page: page,
          pageSize: pageSize,
          username: pathParam.get('username') || '',
        })
        setUserList(res.data.data)
        setTotalPagte(res.data.totalPages)
      }
      getUserFollowed()
    }
  }, [activeTab, page, pathParam])

  // 点击关注/取消关注
  const handleUpdateFollowStatus = async (
    followedId: number,
    isFollow: boolean,
  ) => {
    await UpdateFollowAPI(followedId, isFollow)
    const updateUserStatus = userList.find(
      item => item.followedId === followedId,
    )
    if (updateUserStatus) {
      // 修改与当前用户的关注关系
      const newStatus = !isFollow
      setUserList(prev =>
        prev.map(u =>
          u.followedId === followedId ? { ...u, isFollow: newStatus } : u,
        ),
      )
    }
  }

  return (
    <div>
      <div className="flex gap-10 items-center py-3 text-gray-500 dark:text-white text-[14px] border-b border-solid border-gray-200 dark:border-gray-200/10">
        {InteractionTab.map(item => {
          return (
            <p
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setUserList([])
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
      <UserCard
        userInfoList={userList}
        updateFollowStatus={handleUpdateFollowStatus}
      />
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
