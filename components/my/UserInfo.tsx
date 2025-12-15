'use client'

import Image from 'next/image'
import Icon from '../Icon'
import { UserData } from '@/types/user'
import { useRouter } from 'next/navigation'
import useUserStore from '@/stores/UserStore'
import { toast } from 'sonner'
import { UpdateFollowAPI } from '@/api/user'

interface MyPageUserInfoProps {
  setActiveTab: (title: string) => void
  userData: UserData | null
  refreshUserDataAction: () => void
}

export default function MyPageUserInfo({
  setActiveTab,
  userData,
  refreshUserDataAction,
}: MyPageUserInfoProps) {
  const { userInfo } = useUserStore()
  const router = useRouter()
  const handleUpdateFollowStatus = async (
    isFollow: boolean,
    followedId: number,
  ) => {
    if (userInfo.username == '') {
      toast.info('请先登录')
      return
    }
    await UpdateFollowAPI(followedId, isFollow)
    // 刷新用户信息
    refreshUserDataAction()
  }
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-6 bg-white dark:bg-[#212121] p-6 rounded-[3px]">
      <div className="flex gap-4 items-start w-full relative">
        <Image
          src={userData?.avatar || 'https://picsum.photos/120/80?random=1'}
          className="w-14 h-14 rounded-full"
          alt=""
          width={14}
          height={14}
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <p className="truncate">{userData?.username}</p>
              <div className="flex items-center px-4 py-0.5 rounded-[5px] bg-[#FFECE8] dark:bg-gray-500/50 text-[14px] text-[#F53F3F] dark:text-gray-100">
                码龄{userData?.codeAge}年
              </div>
            </div>
            {userInfo?.username === userData?.username ? (
              <div className="flex gap-4">
                <div
                  className="flex gap-1 items-center border border-gray-300 dark:border-gray-200/10 py-0.5 px-2 rounded-xl cursor-pointer"
                  onClick={() => router.push('/center')}
                >
                  <Icon icon="basil:edit-outline" size={16} />
                  <p className="text-[14px]">编辑资料</p>
                </div>
                <div className="flex gap-1 items-center border border-gray-300 dark:border-gray-200/10 py-0.5 px-2 rounded-xl cursor-pointer">
                  <Icon icon="hugeicons:store-management-01" size={16} />
                  <p className="text-[14px]">管理博文</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <div
                  className="flex gap-1 items-center border border-gray-300 dark:border-gray-200/10 py-1 px-6 rounded-xl cursor-pointer hover:border hover:border-solid hover:border-gray-600"
                  onClick={() =>
                    handleUpdateFollowStatus(
                      userData?.isFollow || false,
                      userData?.id || 0,
                    )
                  }
                >
                  {!userData?.isFollow && (
                    <Icon icon="ic:twotone-add" size={16} />
                  )}
                  <p className="text-[14px]">
                    {userData?.isFollow ? '已关注' : '关注'}
                  </p>
                </div>
                <div className="flex gap-1 items-center border border-gray-300 dark:border-gray-200/10 py-1 px-6 rounded-xl cursor-pointer hover:border hover:border-solid hover:border-gray-600">
                  <Icon icon="uil:message" size={16} />
                  <p className="text-[14px]">私信</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-4 text-[14px]">
            <p
              className="cursor-pointer hover:text-[#fc5531] border-r border-solid border-gray-300 dark:border-gray-200/10 pr-4"
              onClick={() => {
                if (!userData?.publicPersonalList) {
                  return
                }
                setActiveTab('我的文章')
              }}
            >
              <span className="font-bold text-[18px]">
                {userData?.originArticle}{' '}
              </span>
              原创
            </p>
            <p
              className="cursor-pointer hover:text-[#fc5531] border-r border-solid border-gray-300 dark:border-gray-200/10 pr-4"
              onClick={() => {
                if (!userData?.publicFanList || !userData?.publicFollowList) {
                  return
                }
                setActiveTab('关注/互动')
              }}
            >
              <span className="font-bold text-[18px]">{userData?.fans} </span>
              粉丝
            </p>
            <p
              className="cursor-pointer hover:text-[#fc5531]"
              onClick={() => {
                if (!userData?.publicFanList || !userData?.publicFollowList) {
                  return
                }
                setActiveTab('关注/互动')
              }}
            >
              <span className="font-bold text-[18px]">{userData?.follow} </span>
              关注
            </p>
          </div>
          <div className="flex gap-6 text-[14px] text-gray-500">
            <p>IP地址: {userData?.ip}</p>
            <p>加入Jackcon-Blog时间: {userData?.joinTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
