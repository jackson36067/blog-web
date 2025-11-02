'use client'

import Image from 'next/image'
import Icon from '../Icon'
import { useEffect, useState } from 'react'
import { UserData } from '@/types/user'
import { GetUserDataAPI } from '@/api/user'

interface MyPageUserInfoProps {
  setActiveTab: (title: string) => void
}

export default function MyPageUserInfo({ setActiveTab }: MyPageUserInfoProps) {
  const [userInfo, setUserInfo] = useState<UserData | null>(null)
  useEffect(() => {
    const getUserData = async () => {
      const res = await GetUserDataAPI()
      setUserInfo(res.data)
    }
    getUserData()
  }, [])
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-6 bg-white dark:bg-[#212121] p-6 rounded-[3px]">
      <div className="flex gap-4 items-start w-full relative">
        <Image
          src={userInfo?.avatar || 'https://picsum.photos/120/80?random=1'}
          className="w-14 h-14 rounded-full"
          alt=""
          width={14}
          height={14}
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <p className="truncate">jackson</p>
              <div className="flex items-center px-4 py-0.5 rounded-[5px] bg-[#FFECE8] dark:bg-gray-500/50 text-[14px] text-[#F53F3F] dark:text-gray-100">
                码龄{userInfo?.codeAge}年
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex gap-1 items-center border border-gray-300 py-0.5 px-2 rounded-xl cursor-pointer">
                <Icon icon="basil:edit-outline" size={16} />
                <p className="text-[14px]">编辑资料</p>
              </div>
              <div className="flex gap-1 items-center border border-gray-300 py-0.5 px-2 rounded-xl cursor-pointer">
                <Icon icon="hugeicons:store-management-01" size={16} />
                <p className="text-[14px]">管理博文</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-[14px]">
            <p
              className="cursor-pointer hover:text-[#fc5531] border-r border-solid border-gray-300 pr-4"
              onClick={() => {
                setActiveTab('我的文章')
              }}
            >
              <span className="font-bold text-[18px]">
                {userInfo?.originArticle}{' '}
              </span>
              原创
            </p>
            <p
              className="cursor-pointer hover:text-[#fc5531] border-r border-solid border-gray-300 pr-4"
              onClick={() => {
                setActiveTab('关注/互动')
              }}
            >
              <span className="font-bold text-[18px]">{userInfo?.fans} </span>
              粉丝
            </p>
            <p
              className="cursor-pointer hover:text-[#fc5531]"
              onClick={() => {
                setActiveTab('关注/互动')
              }}
            >
              <span className="font-bold text-[18px]">{userInfo?.follow} </span>
              关注
            </p>
          </div>
          <div className="flex gap-6 text-[14px] text-gray-500">
            <p>IP地址: {userInfo?.ip}</p>
            <p>加入Jackcon-Blog时间: {userInfo?.joinTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
