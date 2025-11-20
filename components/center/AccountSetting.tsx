'use client'

import { getPasswordStrengthScore, maskEmail } from '@/utils/encrypt'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import UpdatePasswordDialogContent from './account_setting/UpdatePasswordDialogContent'
import { useState } from 'react'
import UpdateEmailDialogContent from './account_setting/UpdateEmailDialogContent'
import useUserStore from '@/stores/UserStore'
import LoginLogContent from './account_setting/LoginLogContent'

export default function AccountSetting() {
  const [openUpdatePwd, setOpenUpdatePwd] = useState(false)
  const [openUpdateEmail, setOpenUpdateEmail] = useState(false)
  const { userInfo } = useUserStore()
  return (
    <div>
      <div className="text-[18px] font-bold p-2 border-b border-solid border-gray-200 dark:border-gray-200/20">
        账号设置
      </div>
      <ul className="flex flex-col w-full pl-6">
        <li className="flex justify-between w-full pt-8 pb-4 text-[14px]">
          <span className="flex w-14 justify-between">
            {'密码'.split('').map((char, index) => {
              return <span key={index}>{char}</span>
            })}
          </span>
          <div className="flex items-center gap-4">
            <span
              className={`${
                getPasswordStrengthScore('123456') >= 4
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {getPasswordStrengthScore('123456') >= 4
                ? '密码复杂度高, 无需修改'
                : '存在风险, 请修改密码'}
            </span>
            <Dialog open={openUpdatePwd} onOpenChange={setOpenUpdatePwd}>
              <DialogTrigger>
                <a className="text-[#1989fa] dark:text-[#52A8FF] cursor-pointer">
                  修改密码
                </a>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>修改密码</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <UpdatePasswordDialogContent
                  closeDialogAction={() => {
                    setOpenUpdatePwd(false)
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </li>
        <li className="flex justify-between w-full pt-8 pb-4 text-[14px]">
          <span className="flex w-14 justify-between">
            {'邮箱'.split('').map((char, index) => {
              return <span key={index}>{char}</span>
            })}
          </span>
          <div className="flex items-center gap-4">
            <span>{maskEmail(userInfo.email)}</span>
            <Dialog open={openUpdateEmail} onOpenChange={setOpenUpdateEmail}>
              <DialogTrigger>
                <a className="text-[#1989fa] dark:text-[#52A8FF] cursor-pointer">
                  修改邮箱
                </a>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>修改邮箱</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <UpdateEmailDialogContent
                  closeDialogAction={() => {
                    setOpenUpdateEmail(false)
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </li>
        <li className="flex justify-between w-full pt-8 pb-4 text-[14px]">
          <span className="flex w-14 justify-between">
            {'登录记录'.split('').map((char, index) => {
              return <span key={index}>{char}</span>
            })}
          </span>
          <Dialog>
            <DialogTrigger>
              <a className="text-[#1989fa] dark:text-[#52A8FF] cursor-pointer">
                查看记录
              </a>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>登录日志</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <LoginLogContent />
            </DialogContent>
          </Dialog>
        </li>
        <li className="flex justify-between w-full pt-8 pb-4 text-[14px]">
          <span className="flex w-14 justify-between">
            {'账号注销'.split('').map((char, index) => {
              return <span key={index}>{char}</span>
            })}
          </span>
          <a className="text-[#1989fa] dark:text-[#52A8FF] cursor-pointer">
            立即注销
          </a>
        </li>
      </ul>
    </div>
  )
}
