'use client'

import { GetUserDataAPI } from '@/api/user'
import AccountSetting from '@/components/center/AccountSetting'
import PersonalCenterSidebar from '@/components/center/PersonalCenterSidebar'
import PrivacySetting from '@/components/center/privacy_setting/PrivacySetting'
import UserProfile from '@/components/center/UserProfile'
import { UserData } from '@/types/user'
import { useState, useEffect } from 'react'

export default function PersonalCenterPage() {
  const [activeBar, setActiveBar] = useState<string>('个人资料')
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    // 获取用户初始信息
    const getUserInfo = async () => {
      const res = await GetUserDataAPI()
      setUserData(res.data)
    }
    getUserInfo()
  }, [])

  return (
    <div className="flex gap-4 relative py-6">
      <PersonalCenterSidebar
        activeBar={activeBar}
        toggleActiveBar={setActiveBar}
      />
      <div className="flex-1">
        {activeBar === '个人资料' && (
          <UserProfile
            _birthday={userData?.birthday || ''}
            _username={userData?.username || ''}
            _sex={userData?.sex || 0}
            _abstract={userData?.abstract || ''}
            _hobbyTags={userData?.hobbyTags || []}
            sinceLastUpdateUsernameDays={
              userData?.sinceLastUpdateUsernameDays || 0
            }
          />
        )}
        {activeBar === '账号设置' && <AccountSetting />}
        {activeBar === '隐私设置' && (
          <PrivacySetting
            publicBrowsehistory={userData?.publicBrowseHistory || false}
            publicCollectList={userData?.publicCollectList || false}
            publicFanList={userData?.publicFanList || false}
            publicFollowList={userData?.publicFollowList || false}
            publicLikeList={userData?.publicLikeList || false}
            publicPersonalList={userData?.publicPersonalList || false}
          />
        )}
      </div>
    </div>
  )
}
