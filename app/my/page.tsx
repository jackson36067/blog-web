'use client'

import MyPageAchievement from '@/components/my/MyPageAchievement'
import MyPageTabs from '@/components/my/Tabs'
import MyPageUserInfo from '@/components/my/UserInfo'
import { useState } from 'react'

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('我的文章')
  return (
    <div className="min-h-screen bg-[#f0eeee] dark:bg-[#0a0a0a] p-6">
      <MyPageUserInfo setActiveTab={setActiveTab} />
      <div className="flex gap-10 max-w-[1400px] mx-auto mt-4">
        <MyPageAchievement />
        <div className="flex-1 flex gap-6 bg-white dark:bg-[#212121] rounded-[3px] px-6">
          <MyPageTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  )
}
