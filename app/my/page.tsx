'use client'

import MyPageAchievement from '@/components/my/MyPageAchievement'
import MyPageBlogCalendar from '@/components/my/MyPageBlogCalendar'
import MyPageTabs from '@/components/my/Tabs'
import MyPageUserInfo from '@/components/my/UserInfo'
import useMyPageActiveTabStore from '@/stores/MyPageActiveTabStore'

export default function MyPage() {
  const { activeTab, setActiveTab } = useMyPageActiveTabStore()
  return (
    <div className="py-6">
      <MyPageUserInfo setActiveTab={setActiveTab} />
      <div className="flex gap-10 mt-4">
        <div className="flex flex-col gap-4">
          <MyPageAchievement />
          <MyPageBlogCalendar />
        </div>
        <div className="flex-1 flex gap-6 bg-white dark:bg-[#212121] rounded-[3px] px-6">
          <MyPageTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  )
}
