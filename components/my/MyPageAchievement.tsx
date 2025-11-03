'use client'

import { GetUserAchievementAPI } from '@/api/user'
import { UsreAchievementResponse } from '@/types/user'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function MyPageAchievement() {
  const [userAchievement, setUserAchievement] =
    useState<UsreAchievementResponse | null>(null)
  useEffect(() => {
    const getUserAchievement = async () => {
      const res = await GetUserAchievementAPI()
      setUserAchievement(res.data)
    }
    getUserAchievement()
  }, [])
  return (
    <div className="w-[300px] h-[180px] bg-white dark:bg-[#212121] px-6 rounded-[3px]">
      <div className="w-full py-3 border-b border-solid border-gray-200 font-bold text-gray-500 text-[14px]">
        个人成就
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-3">
          <Image
            src={'/images/like.png'}
            className="w-6 h-6"
            alt=""
            width={6}
            height={6}
          />
          <p className="text-gray-500 text-[14px]">
            获得 {userAchievement?.totalLikes ? userAchievement.totalLikes : 0}{' '}
            次点赞
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src={'/images/comment.png'}
            className="w-6 h-6"
            alt=""
            width={6}
            height={6}
          />
          <p className="text-gray-500 text-[14px]">
            内容获得{' '}
            {userAchievement?.totalComments ? userAchievement.totalComments : 0}{' '}
            次评论
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src={'/images/collect.png'}
            className="w-6 h-6"
            alt=""
            width={6}
            height={6}
          />
          <p className="text-gray-500 text-[14px]">
            获得{' '}
            {userAchievement?.totalCollects ? userAchievement.totalCollects : 0}{' '}
            次收藏
          </p>
        </div>
      </div>
    </div>
  )
}
