'use client'

import { GetHistorySessionAPI } from '@/api/message'
import useUserStore from '@/stores/UserStore'
import { SessionItem } from '@/types/message'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Icon from '../Icon'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

export default function MyMessageTabContent() {
  const [sessionHistory, setSessionHistory] = useState<SessionItem[]>([])
  const { userInfo } = useUserStore()
  useEffect(() => {
    const getSessionHistory = async () => {
      const res = await GetHistorySessionAPI()
      setSessionHistory(res.data)
    }
    getSessionHistory()
  }, [])
  return (
    <div className="flex h-130">
      {/* 展示用户会话列表 */}
      <div className="flex-1 h-full border-r border-solid border-r-gray-200 dark:border-r-gray-200/20">
        {/* 展示当前用户信息 */}
        <div className="flex justify-between items-center pb-2 pl-6 pr-1 text-[#777888] border-b border-solid border-r-gray-200 dark:border-r-gray-200/20">
          <div className="flex items-center gap-2">
            <Image
              src={userInfo.avatar || `https://picsum.photos/120/80?random=1`}
              alt=""
              width={10}
              height={10}
              className="w-10 h-10 rounded-full"
            />
            <p>{userInfo.username}</p>
          </div>
          <HoverCard>
            <HoverCardTrigger>
              <div className="hover:bg-[#f0f0f3] rounded-full p-1 cursor-pointer">
                <Icon icon="gg:erase" size={22} />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="py-1 px-2 w-30 text-center">
              一键已读
            </HoverCardContent>
          </HoverCard>
        </div>
        {/* 展示会话历史列表 */}
        {sessionHistory.map(item => {
          return (
            <div
              className="flex gap-2 items-center pl-6 pr-2 py-4 text-[14px] border-b border-solid border-gray-200 dark:border-gray-200/20 hover:bg-[#efeff2] cursor-pointer"
              key={item.sessionId}
            >
              <Image
                src={
                  item.chatUserAvatar || `https://picsum.photos/120/80?random=1`
                }
                alt=""
                width={12}
                height={12}
                className="w-12 h-12 rounded-full"
              />
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-1 items-center">
                    <p>{item.chatUsername}</p>
                    {item.isFollow && (
                      <div className="text-[12px] text-[#777888] rounded-lg py-px px-1 bg-[#f0f0f3]">
                        已关注
                      </div>
                    )}
                  </div>
                  <p className="text-[12px] text-[#777888]">
                    {item.latestChatTime}
                  </p>
                </div>
                <p className="truncate text-[12px] w-32">
                  {item.latestMessage}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      {/* 展示用户会话消息列表 */}
      <div className="w-270 h-full text-center leading-130">
        您还未选中或者发起聊天, 快去跟好友聊一聊吧
      </div>
    </div>
  )
}
