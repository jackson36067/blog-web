"use client";

import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import { OtherMessageItem } from "@/types/message";
import Image from "next/image";

export default function MessageItem({
  type,
  message,
}: {
  type: number;
  message: OtherMessageItem;
}) {
  return (
    <div className="flex justify-between p-3">
      <div className="flex-1 flex gap-3">
        <Image
          src={message.userAvatar}
          alt=""
          width={11}
          height={11}
          className="w-11 h-11 rounded-full"
        />
        <div className="flex flex-col gap-1 text-[14px]">
          <p>
            {message.username}
            <span className="pl-2 text-[12px] text-gray-400">
              {message.actionMessage}
            </span>
          </p>
          {message.message && (
            <p className="max-w-200 truncate font-bold cursor-pointer hover:border-b hover:border-solid hover:border-gray-800 hover:dark:border-gray-400/80 mb-2">
              {message.message}
            </p>
          )}
          <p
            className={cn(
              "text-[#555666] dark:text-gray-400 cursor-pointer",
              type === 3 && "font-bold",
            )}
          >
            {message.title}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 text-[12px] text-gray-400">
        <Icon
          icon="material-symbols-light:delete-outline"
          size={16}
          className="cursor-pointer"
        />
        <p>{message.sendTime}</p>
      </div>
    </div>
  );
}
