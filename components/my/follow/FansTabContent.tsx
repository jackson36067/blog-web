'use client'

import { GetUserFansListAPI, UpdateFollowAPI } from '@/api/user'
import UserCard from '@/components/UserCard'
import { UserListResponse } from '@/types/user'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface FollowedTabContentProps {
  page: number
  pageSize: number
  setTotalPage: (totalPage: number) => void
}

export default function FansTabContent({
  page,
  pageSize,
  setTotalPage,
}: FollowedTabContentProps) {
  const pathParam = useSearchParams()
  const [userList, setUserList] = useState<UserListResponse[]>([])
  useEffect(() => {
    const getUserFans = async () => {
      const res = await GetUserFansListAPI({
        page: page,
        pageSize: pageSize,
        username: pathParam.get('username') || '',
      })
      setUserList(res.data.data)
      setTotalPage(res.data.totalPages)
    }
    getUserFans()
  }, [page, pageSize, pathParam, setTotalPage])

  // 点击关注/取消关注
  const handleUpdateFollowStatus = async (
    followedId: number,
    isFollow: boolean,
  ) => {
    await UpdateFollowAPI(followedId, isFollow)
    const updateUserStatus = userList.find(item => item.id === followedId)
    if (updateUserStatus) {
      // 修改与当前用户的关注关系
      const newStatus = !isFollow
      setUserList(prev =>
        prev.map(u =>
          u.id === followedId ? { ...u, isFollow: newStatus } : u,
        ),
      )
    }
  }
  return (
    <div>
      <UserCard
        userInfoList={userList}
        updateFollowStatus={handleUpdateFollowStatus}
      />
    </div>
  )
}
