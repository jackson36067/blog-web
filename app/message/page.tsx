"use client";

import Icon from "@/components/Icon";
import MessagePageTab from "@/components/message/MessagePageTab";

export default function MessagePage() {
  return (
    <div className="shadow py-6 h-176 bg-white dark:bg-[#212121]">
      <div className="flex justify-between items-center px-6 pb-2">
        <p className="text-[18px]">消息中心</p>
        <div className="flex gap-1 items-center text-[14px] cursor-pointer">
          <Icon icon="tabler:message-cog" />
          <p>消息设置</p>
        </div>
      </div>
      <MessagePageTab />
    </div>
  );
}
