"use client";

import Icon from "@/components/Icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OtherMessageItem } from "@/types/message";
import Image from "next/image";

export default function FanMessageItem({
  message,
}: {
  message: OtherMessageItem;
}) {
  return (
    <div className="flex justify-between items-center group py-4 border-b border-solid border-gray-[#f0f0f3] dark:border-gray-200/20">
      <div className="flex items-center gap-4">
        <Image
          src={message.userAvatar}
          alt=""
          width={20}
          height={20}
          className="w-10 h-10 rounded-full"
        />
        <div className="text-[14px]">
          <p>{message.username}</p>
          <p className="text-gray-400">
            <span>{message.sendTime}</span>
            <span>{message.actionMessage}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger>
            <div className="hover:bg-[#f0f0f3] dark:hover:bg-[#1e1e22] opacity-0 group-hover:opacity-100 rounded-full px-px py-px text-gray-400 cursor-pointer">
              <Icon icon="weui:more-outlined" size={24} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2 w-20 py-1! px-0! cursor-pointer">
            <div className="py-1 hover:bg-[#f0f0f3] dark:hover:bg-[#1e1e22] text-center">
              私信
            </div>
            <div className="py-1 hover:bg-[#f0f0f3] dark:hover:bg-[#1e1e22] text-center">
              删除
            </div>
          </PopoverContent>
        </Popover>
        <div className="border border-solid border-[#ccccd8] dark:border-gray-200/20 rounded-2xl px-5 py-1 cursor-pointer">
          <p>{!message.isFollow ? "回关" : "已关注"}</p>
        </div>
      </div>
    </div>
  );
}
