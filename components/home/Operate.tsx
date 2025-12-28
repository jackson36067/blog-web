"use client";

import useUserStore from "@/stores/UserStore";
import Icon from "../Icon";
import ThemeToggle from "../ThemeToggle";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import LoginAndRegisterDialogContent from "../dialog/LoginAndRegisterDialogContent";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import AvatarHoverCardContent from "./AvatarHoverCardContent";
import useLoginPopupStatusStore from "@/stores/LoginPopupStatusStore";
import { useRouter } from "next/navigation";
import useUnreadStore from "@/stores/HasUnreadStore";

export default function Operate() {
  const { userInfo } = useUserStore();
  const { open, setOpen } = useLoginPopupStatusStore();
  const router = useRouter();
  const { hasUnread } = useUnreadStore();

  return (
    <div className="flex items-center gap-6">
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-all duration-300" />
      )}

      {/* 写文章按钮：增加渐变和悬停缩放 */}
      <button
        className="group flex items-center gap-2 text-white bg-linear-to-r from-[#fc5531] to-[#ff7a5c] hover:shadow-lg hover:shadow-[#fc5531]/30 rounded-full py-1.5 px-4 cursor-pointer outline-none transition-all duration-300 active:scale-95"
        onClick={() => window.open("/creation", "_blank")}
      >
        <Icon
          icon="streamline-ultimate:pen-write"
          size="16"
          color="#fff"
          className="group-hover:rotate-12 transition-transform"
        />
        <span className="text-sm font-bold">写文章</span>
      </button>

      {/* 消息图标：悬停微动 */}
      <div
        className="relative flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer group"
        onClick={() => router.push(`/message`)}
      >
        <Icon
          icon="tabler:message"
          size="24"
          className="text-gray-700 dark:text-gray-200 group-hover:scale-110 transition-transform"
        />
        {hasUnread && (
          <span className="absolute right-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white dark:border-[#212121] animate-pulse" />
        )}
      </div>

      <ThemeToggle />

      <div className="flex items-center">
        {userInfo.token ? (
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              <div className="relative p-0.5 rounded-full ring-2 ring-transparent hover:ring-[#fc5531]/50 transition-all duration-300 cursor-pointer">
                <Image
                  src={
                    userInfo.avatar || "https://picsum.photos/120/80?random=1"
                  }
                  className="w-9 h-9 rounded-full object-cover shadow-inner"
                  alt="avatar"
                  width={36}
                  height={36}
                  onClick={() =>
                    router.push(`/my?username=${userInfo.username}`)
                  }
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent
              sideOffset={8}
              className="w-64 overflow-hidden rounded-xl border-none shadow-2xl"
            >
              <AvatarHoverCardContent userInfo={userInfo} />
            </HoverCardContent>
          </HoverCard>
        ) : (
          <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogTrigger asChild>
              <Avatar className="w-9 h-9 border-2 border-transparent hover:border-[#fc5531] transition-all cursor-pointer">
                <AvatarFallback className="bg-gray-200 dark:bg-white/10 font-bold text-[10px] uppercase">
                  Login
                </AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent
              onInteractOutside={(e) => e.preventDefault()}
              className="sm:max-w-[420px] rounded-2xl p-0 overflow-hidden border-none"
            >
              <DialogHeader className="hidden">
                <DialogTitle />
                <DialogDescription />
              </DialogHeader>
              <LoginAndRegisterDialogContent
                onCloseDialog={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
