"use client";

import { MessagePageTabs } from "@/constants/tab";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import MyMessageTabContent from "./MyMessageTabContent";
import CommentMessageTabContent from "./CommentMessageTabContent";
import LikeOrCollectMessageTabContent from "./LikeOrCollectMessageTabContent";
import FanMessageTabContent from "./FanMessageTabContent";
export default function MessagePageTab() {
  const [activeTab, setActiveTab] = useState<string>("我的消息");
  const activeItem = MessagePageTabs.find((item) => item.title === activeTab);
  return (
    <div>
      <Tabs.Root
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full px-3"
      >
        {/* Tab 列表 */}
        <Tabs.List
          className="w-full border-b flex gap-10 items-center overflow-x-auto text-[16px]"
          aria-label="Manage your account"
        >
          {MessagePageTabs.map((item, idx) => {
            return (
              <Tabs.Trigger
                key={idx}
                value={item.title}
                className="group outline-none py-1.5 text-gray-500 data-[state=active]:border-b-2 data-[state=active]:border-[#222226]
            dark:data-[state=active]:border-white data-[state=active]:text-[#222226] dark:data-[state=active]:text-white"
              >
                <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-[#1d98d1] font-medium">
                  {item.title}
                </div>
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        {/* Tab 内容 */}
        <div className="relative min-h-[100px] py-2 px-3">
          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.div
                key={activeItem.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Tabs.Content value={activeItem.title}>
                  {activeItem.title === "我的消息" && <MyMessageTabContent />}
                  {activeItem.title === "评论和@" && (
                    <CommentMessageTabContent />
                  )}
                  {activeItem.title === "赞和收藏" && (
                    <LikeOrCollectMessageTabContent />
                  )}
                  {activeItem.title === "新增粉丝" && <FanMessageTabContent />}
                </Tabs.Content>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tabs.Root>
    </div>
  );
}
