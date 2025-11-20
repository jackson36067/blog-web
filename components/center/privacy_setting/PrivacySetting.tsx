'use client'

import { updateUserFieldAPI } from '@/api/user'
import { Switch } from '@/components/ui/switch'
import useUserStore from '@/stores/UserStore'
import { useEffect, useState } from 'react'

interface PrivacySettingProps {
  publicCollectList: boolean
  publicFanList: boolean
  publicFollowList: boolean
  publicBrowsehistory: boolean
  publicPersonalList: boolean
  publicLikeList: boolean
}

export default function PrivacySetting({
  publicCollectList,
  publicFanList,
  publicFollowList,
  publicBrowsehistory,
  publicPersonalList,
  publicLikeList,
}: PrivacySettingProps) {
  const [publicBrowseHistoryState, setPublicBrowseHistoryState] =
    useState(false)
  const [publicCollectListState, setPublicCollectListState] = useState(false)
  const [publicFanListState, setPublicFanListState] = useState(false)
  const [publicFollowListState, setPublicFollowListState] = useState(false)
  const [publicLikeListState, setPublicLikeListState] = useState(false)
  const [publicPersonalListState, setPublicPersonalListState] = useState(false)
  const { userInfo } = useUserStore()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPublicBrowseHistoryState(publicBrowsehistory)
    setPublicCollectListState(publicCollectList)
    setPublicFanListState(publicFanList)
    setPublicFollowListState(publicFollowList)
    setPublicLikeListState(publicLikeList)
    setPublicPersonalListState(publicPersonalList)
  }, [
    publicBrowsehistory,
    publicCollectList,
    publicFanList,
    publicFollowList,
    publicLikeList,
    publicPersonalList,
  ])
  const updateUserPrivacySetting = async (key: string, value: boolean) => {
    await updateUserFieldAPI(userInfo.userId, [{ field: key, value }])
  }
  return (
    <div>
      <div className="text-[18px] font-bold p-2 border-b border-solid border-gray-200 dark:border-gray-200/20">
        隐私设置
      </div>
      <div className="flex flex-col text-[14px]">
        <div className="flex justify-between items-center py-4 border-b border-solid border-gray-200 dark:border-gray-200/20">
          <div className="pl-6">
            <p className="mb-4 font-bold text-[16px]">点赞文章</p>
            <p className="text-[#555666] dark:text-[#BBBBCC]">
              开启后在个人主页向他人展示点赞文章
            </p>
          </div>
          <Switch
            id="airplane-mode"
            checked={publicLikeListState}
            onCheckedChange={checked => {
              updateUserPrivacySetting('publicLikeList', checked)
              setPublicLikeListState(checked)
            }}
          />
        </div>
        <div className="flex justify-between items-center py-4 border-b border-solid border-gray-200 dark:border-gray-200/20">
          <div className="pl-6">
            <p className="mb-4 font-bold text-[16px]">收藏文章</p>
            <p className="text-[#555666] dark:text-[#BBBBCC]">
              开启后在个人主页向他人展示收藏文章
            </p>
          </div>
          <Switch
            id="airplane-mode"
            checked={publicCollectListState}
            onCheckedChange={checked => {
              updateUserPrivacySetting('publicCollectList', checked)
              setPublicCollectListState(checked)
            }}
          />
        </div>
        <div className="flex justify-between items-center py-4 border-b border-solid border-gray-200 dark:border-gray-200/20">
          <div className="pl-6">
            <p className="mb-4 font-bold text-[16px]">最近浏览文章</p>
            <p className="text-[#555666] dark:text-[#BBBBCC]">
              开启后在个人主页向他人展示最近浏览文章
            </p>
          </div>
          <Switch
            id="airplane-mode"
            checked={publicBrowseHistoryState}
            onCheckedChange={checked => {
              updateUserPrivacySetting('publicBrowseHistory', checked)
              setPublicBrowseHistoryState(checked)
            }}
          />
        </div>
        <div className="flex justify-between items-center py-4 border-b border-solid border-gray-200 dark:border-gray-200/20">
          <div className="pl-6">
            <p className="mb-4 font-bold text-[16px]">关注</p>
            <p className="text-[#555666] dark:text-[#BBBBCC]">
              开启后在个人主页向他人展示关注列表
            </p>
          </div>
          <Switch
            id="airplane-mode"
            checked={publicFollowListState}
            onCheckedChange={checked => {
              updateUserPrivacySetting('publicFollowList', checked)
              setPublicFollowListState(checked)
            }}
          />
        </div>
        <div className="flex justify-between items-center py-4 border-b border-solid border-gray-200 dark:border-gray-200/20">
          <div className="pl-6">
            <p className="mb-4 font-bold text-[16px]">粉丝</p>
            <p className="text-[#555666] dark:text-[#BBBBCC]">
              开启后在个人主页向他人展示粉丝列表
            </p>
          </div>
          <Switch
            id="airplane-mode"
            checked={publicFanListState}
            onCheckedChange={checked => {
              updateUserPrivacySetting('publicFanList', checked)
              setPublicFanListState(checked)
            }}
          />
        </div>
        <div className="flex justify-between items-center py-4 border-b border-solid border-gray-200 dark:border-gray-200/20">
          <div className="pl-6">
            <p className="mb-4 font-bold text-[16px]">个人文章</p>
            <p className="text-[#555666] dark:text-[#BBBBCC]">
              开启后在个人主页向他人展示个人文章
            </p>
          </div>
          <Switch
            id="airplane-mode"
            checked={publicPersonalListState}
            onCheckedChange={checked => {
              updateUserPrivacySetting('publicPersonalList', checked)
              setPublicPersonalListState(checked)
            }}
          />
        </div>
      </div>
    </div>
  )
}
