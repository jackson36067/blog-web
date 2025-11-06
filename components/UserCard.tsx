'use client'

import { cn } from '@/lib/utils'
import { UserListResponse } from '@/types/user'
import Image from 'next/image'

interface UserCardProps {
  userInfoList: UserListResponse[]
  updateFollowStatus: (followedId: number, isFollow: boolean) => void
}

export default function UserCard({
  userInfoList,
  updateFollowStatus,
}: UserCardProps) {
  const handleUpdateFollowStatus = (followedId: number, isFollow: boolean) => {
    updateFollowStatus(followedId, isFollow)
  }
  return (
    <div>
      {userInfoList.map(userInfo => {
        return (
          <div
            key={userInfo.id}
            className="w-full flex justify-between items-center px-2 py-6 border-b border-solid border-gray-200 dark:border-gray-200/20"
          >
            <div className="flex items-center gap-2">
              <Image
                src={userInfo.avatar}
                alt=""
                className="w-12 h-12 rounded-full"
                width={12}
                height={12}
              />
              <div className="flex flex-col gap-1 max-w-[900px] w-[800px]">
                <p className="truncate">{userInfo.username}</p>
                <p className="text-[#555666] text-[14px] truncate">
                  {userInfo.abstract || '这个家伙很懒, 什么都没留下'}
                </p>
              </div>
            </div>
            <div
              className={cn(
                !userInfo.isFollow && 'text-[#555666]',
                'text-[#999aaa] border border-solid border-[#ccccd8] rounded-[12px] cursor-pointer w-[74px] h-6 text-center leading-6 text-[14px]',
              )}
              onClick={() =>
                handleUpdateFollowStatus(userInfo.id, userInfo.isFollow)
              }
            >
              {userInfo.isFollow ? '已关注' : '关注'}
            </div>
          </div>
        )
      })}
    </div>
  )
}
