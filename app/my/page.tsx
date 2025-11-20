'use client'

import { GetUserDataAPI } from '@/api/user'
import MyPageAchievement from '@/components/my/MyPageAchievement'
import MyPageBlogCalendar from '@/components/my/MyPageBlogCalendar'
import MyPageTabs from '@/components/my/Tabs'
import MyPageUserInfo from '@/components/my/UserInfo'
import useMyPageActiveTabStore from '@/stores/MyPageActiveTabStore'
import { UserData } from '@/types/user'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MyPage() {
  const pathParams = useSearchParams()
  const { activeTab, setActiveTab } = useMyPageActiveTabStore()
  const [userData, setUserData] = useState<UserData | null>(null)
  useEffect(() => {
    const getUserData = async () => {
      const res = await GetUserDataAPI({
        username: pathParams.get('username') || '',
      })
      setUserData(res.data)
      // 字段 -> tab 映射
      const tabMap = [
        ['publicLikeList', '我的点赞'],
        ['publicBrowseHistory', '最近浏览'],
        ['publicPersonalList', '我的文章'],
        ['publicCollectList', '我的收藏'],
      ] as const

      const matched = tabMap.find(([key]) => res.data[key])

      setActiveTab(matched ? matched[1] : '关注/互动')
    }
    getUserData()
  }, [pathParams, setActiveTab])
  return (
    <div className="py-6">
      <MyPageUserInfo setActiveTab={setActiveTab} userData={userData} />
      <div className="flex gap-10 mt-4">
        <div className="flex flex-col gap-4">
          <MyPageAchievement />
          <MyPageBlogCalendar />
        </div>
        <div className="flex-1 flex gap-6 bg-white dark:bg-[#212121] rounded-[3px] px-6">
          <MyPageTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            userData={userData}
          />
        </div>
      </div>
    </div>
  )
}
