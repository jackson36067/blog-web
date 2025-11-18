'use client'

import useUserStore from '@/stores/UserStore'
import Icon from '../Icon'
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import AvatarHoverCardContent from './AvatarHoverCardContent'
import useLoginPopupStatusStore from '@/stores/LoginPopupStatusStore'
import { useRouter } from 'next/navigation'

export default function Operate() {
  const { userInfo } = useUserStore()
  const { open, setOpen } = useLoginPopupStatusStore()
  const router = useRouter()
  return (
    <div className="flex items-center gap-5">
      {open && <div className="fixed inset-0 bg-black/50 z-40" />}
      <button className="flex gap-2 text-white bg-[#fc5531] rounded-[20px] py-1 px-3 cursor-pointer outline-none">
        <Icon
          icon="streamline-ultimate:pen-write"
          color="#fff"
          className="mb-1 mr-1"
        />
        写文章
      </button>
      <div className="dark:text-white text-[#212121]">
        <Icon icon="tabler:message" size="26" className="text-inherit" />
      </div>
      <ThemeToggle />
      <div className="cursor-pointer">
        {userInfo.token ? (
          <HoverCard>
            <HoverCardTrigger>
              <Image
                src={userInfo.avatar || 'https://picsum.photos/120/80?random=1'}
                className="w-9 h-9 rounded-full"
                alt=""
                width={12}
                height={12}
                onClick={() => {
                  router.push(`/my?username=${userInfo.username}`)
                }}
              />
            </HoverCardTrigger>
            <HoverCardContent>
              <AvatarHoverCardContent userInfo={userInfo} />
            </HoverCardContent>
          </HoverCard>
        ) : (
          <Dialog open={open} onOpenChange={setOpen} modal={false}>
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
                onCloseDialog={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
