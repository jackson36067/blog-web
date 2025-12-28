"use client";

import { GroupChatMessageItem, SessionItem } from "@/types/message";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function MessageItemPane({
  selectedSession,
  item,
}: {
  selectedSession: SessionItem;
  item: GroupChatMessageItem;
}) {
  return (
    <div key={item.sendTime}>
      <div className="text-center my-1 text-[10px] text-gray-400">
        {item.sendTime}
      </div>
      <div className="flex flex-col gap-4">
        {item.messages.length > 0 &&
          item.messages.map((item) => {
            return (
              <div key={item.id}>
                {item.userId === selectedSession.chatUserId ? (
                  <div
                    className={cn("flex gap-2 itmes-start justify-start")}
                    key={item.id}
                  >
                    <Image
                      src={item.userAvatar}
                      alt=""
                      width={20}
                      height={20}
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="bg-[#f5f5f5] dark:bg-[#2a2a2a] p-2 rounded-lg max-w-200">
                      {item.message}
                    </p>
                  </div>
                ) : (
                  <div
                    className={cn("flex gap-2 itmes-start justify-end")}
                    key={item.id}
                  >
                    <p className="bg-[#f5f5f5] dark:bg-[#2a2a2a] p-2 rounded-lg max-w-200 wrap-break-word">
                      {item.message}
                    </p>
                    <Image
                      src={item.userAvatar}
                      alt=""
                      width={20}
                      height={20}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
