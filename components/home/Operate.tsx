'use client'

import useUserStore from '@/stores/UserStore'
import Icon from '../Icon'
import SearchInput from '../SearchInput'
import ThemeToggle from '../ThemeToggle'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import Image from 'next/image'
import LoginAndRegisterDialogContent from '../dialog/LoginAndRegisterDialogContent'
import { useState } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import AvatarHoverCardContent from './AvatarHoverCardContent'

export default function Operate() {
  const { userInfo } = useUserStore()
  const [open, setopen] = useState(false)
  return (
    <div className="flex items-center gap-5">
      <SearchInput />
      <div className="cursor-pointer">
        {userInfo.token ? (
          <HoverCard>
            <HoverCardTrigger>
              <Image
                src={userInfo.avatar}
                className="w-9 h-9 rounded-full"
                alt=""
                width={12}
                height={12}
              />
            </HoverCardTrigger>
            <HoverCardContent>
              <AvatarHoverCardContent userInfo={userInfo} />
            </HoverCardContent>
          </HoverCard>
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
    </div>
  )
}
