"use client";

import EmojiPicker from "@/components/EmojiPicker";
import Icon from "@/components/Icon";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function MessageInputPane() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  // 监听表情选择器失去焦点, 关闭表情选择器
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!emojiRef.current) return;

      const path = event.composedPath();
      if (!path.includes(emojiRef.current)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full px-3 py-2 border-t border-solid border-t-gray-200 dark:border-t-gray-200/20">
      <div className="flex items-center gap-4 text-[14px] text-gray-400">
        <div className="relative" ref={emojiRef}>
          <Icon
            icon="mingcute:emoji-fill"
            size={22}
            hanldeOnClick={() => setShowEmojiPicker(true)}
            className="cursor-pointer"
          />
          {showEmojiPicker && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-full -left-1 mt-1 
                     w-70 h-40 overflow-y-auto bg-white dark:bg-[#212121] shadow-md rounded-lg z-50"
              >
                <EmojiPicker
                  onSelectedEmoji={(emoji) => {
                    setMessage((prev) => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div>
          <Icon icon="fa6-solid:image" size={18} className="cursor-pointer" />
        </div>
      </div>
      <Textarea
        className="w-full h-28! mt-2 border-none resize-none shadow-none p-0 text-[14px] dark:bg-[#212121]!"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex justify-between items-center py-1">
        <div className="text-[12px] text-gray-400">
          <span>0</span>
          <span>/500</span>
        </div>
        <div className="px-4 py-px text-white bg-[#fc5531] dark:bg-[#e04728] rounded-2xl text-[14px] cursor-pointer">
          发送
        </div>
      </div>
    </div>
  );
}
