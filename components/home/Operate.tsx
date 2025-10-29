'use client'

import useUserStore from '@/stores/UserStore'
import Icon from '../Icon'
import SearchInput from '../SearchInput'
import ThemeToggle from '../ThemeToggle'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import LoginAndRegisterDialogContent from '../dialog/LoginAndRegisterDialogContent'
import { useState } from 'react'

export default function Operate() {
  const { userInfo } = useUserStore()
  const [open, setopen] = useState(false)
  return (
    <div className="flex items-center gap-5">
      <SearchInput />
      <Button className="bg-[#fc5531] hover:bg-gray-400 dark:text-white">
        <Icon
          icon="streamline-ultimate:pen-write"
          color="#fff"
          className="mb-1 mr-1"
        />
        写文章
      </Button>
      <div className="dark:text-white text-[#212121]">
        <Icon icon="tabler:message" size="26" className="text-inherit" />
      </div>
      <ThemeToggle />
      <div className="cursor-pointer">
        {userInfo.token ? (
          <Avatar>
            <AvatarImage
              src={userInfo.avatar || 'https://github.com/shadcn.png'}
            />
            <AvatarFallback>{userInfo.username}</AvatarFallback>
          </Avatar>
        ) : (
          <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger>
              <Avatar>
                <AvatarFallback>登录</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent
              onInteractOutside={e => e.preventDefault()} // 禁止点击遮罩层关闭
            >
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <LoginAndRegisterDialogContent
                onCloseDialog={() => setopen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
