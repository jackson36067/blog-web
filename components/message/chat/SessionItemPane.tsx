"use client";

import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import { SessionItem } from "@/types/message";
import Image from "next/image";
import { MouseEvent } from "react";

export default function SessionItemPane({
  selectedSession,
  item,
  handleSelectSession,
  handelContextMenu,
}: {
  selectedSession: SessionItem;
  item: SessionItem;
  handleSelectSession: () => void;
  handelContextMenu: (event: MouseEvent, session: SessionItem) => void;
}) {
  return (
    <div
      className={cn(
        "flex gap-2 items-center pl-6 pr-2 py-4 text-[14px] border-b border-solid border-gray-200 dark:border-gray-200/20 hover:bg-[#efeff2] dark:hover:bg-[#121212] cursor-pointer",
        item.chatUserId === selectedSession?.chatUserId &&
          "bg-[#efeff2] dark:bg-[#121212]",
        item.isPinned && "bg-[#f6f6f8] dark:bg-[#121201]",
      )}
      key={item.sessionId}
      onClick={() => handleSelectSession()}
      onContextMenu={(e) => handelContextMenu(e, item)}
    >
      <div className="relative w-14 h-12">
        {/* 用户头像 */}
        <Image
          src={item.chatUserAvatar || `https://picsum.photos/120/80?random=1`}
          alt=""
          width={12}
          height={12}
          className="w-10 h-10 rounded-full"
        />
        {/* 未读消息数量 */}
        {item.unreadCount > 0 && (
          <div className="absolute right-0 -top-1 text-[10px] bg-[#fc5531] text-white font-bold px-[5px] rounded-full">
            {item.unreadCount}
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <p>{item.chatUsername}</p>
              {item.isFollow && (
                <div
                  className={cn(
                    "text-[12px] text-[#777888] rounded-lg py-px px-1 bg-[#f0f0f3]",
                    item.chatUserId === selectedSession?.chatUserId &&
                      "bg-[#f7f7f7] dark:bg-[#212121]",
                  )}
                >
                  已关注
                </div>
              )}
            </div>
            <p className="truncate text-[12px] w-32">{item.latestMessage}</p>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <p className="text-[12px] text-[#777888]">{item.latestChatTime}</p>
            {item.isMuted && (
              <Icon
                icon="mage:notification-bell-muted"
                size={16}
                color="#777888"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
