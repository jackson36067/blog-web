'use client'

import AccountSetting from '@/components/center/AccountSetting'
import PersonalCenterSidebar from '@/components/center/PersonalCenterSidebar'
import UserProfile from '@/components/center/UserProfile'
import { useState } from 'react'

export default function PersonalCenterPage() {
  const [activeBar, setActiveBar] = useState<string>('个人资料')
  return (
    <div className="flex gap-4 relative py-6">
      <PersonalCenterSidebar
        activeBar={activeBar}
        toggleActiveBar={setActiveBar}
      />
      <div className="flex-1">
        {activeBar === '个人资料' && <UserProfile />}
        {activeBar === '账号设置' && <AccountSetting />}
      </div>
    </div>
  )
}
