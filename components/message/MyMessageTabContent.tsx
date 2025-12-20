"use client";
import {
  GetChatMessageAPI,
  GetHistorySessionAPI,
  UpdateSessionAPI,
} from "@/api/message";
import useUserStore from "@/stores/UserStore";
import { GroupChatMessageItem, SessionItem } from "@/types/message";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Icon from "../Icon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { cn } from "@/lib/utils";
import MessageInputPane from "./chat/MessageInputPane";
import useSelectSessionStore from "@/stores/SelectSessionStore";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";

export default function MyMessageTabContent() {
  const { selectedSession, newSelectSession } = useSelectSessionStore();
  // 保存用户会话历史
  const [sessionHistory, setSessionHistory] = useState<SessionItem[]>([]);
  const { userInfo } = useUserStore();
  // 保存用户聊天记录
  const [chatMessages, setChatMessages] = useState<GroupChatMessageItem[]>([]);

  const getSessionHistory = useCallback(async () => {
    const res = await GetHistorySessionAPI();
    setSessionHistory(res.data);
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
    getSessionHistory();
  }, [getSessionHistory]);

  useEffect(() => {
    if (selectedSession.sessionId === 0) return;
    const getChatMessages = async () => {
      // 获取聊天记录
      const res = await GetChatMessageAPI(selectedSession.chatUserId);
      setChatMessages(res.data);
    };
    getChatMessages();
  }, [selectedSession.sessionId, selectedSession.chatUserId]);

  // 选择聊天对象
  const handleSelectSession = async (session: SessionItem) => {
    if (session.sessionId === selectedSession?.sessionId) return;
    newSelectSession(session);
  };

  // 更新会话信息
  // eslint-disable-next-line
  const handleUpdateSession = async (field: string, value: any) => {
    // 发送更新会话请求
    await UpdateSessionAPI(selectedSession.sessionId, [{ field, value }]);
    // 更新本地会话信息
    newSelectSession({ ...selectedSession, [field]: value });
    // 重新获取会话列表
    getSessionHistory();
  };

  return (
    <div className="flex h-140">
      {/* 展示用户会话列表 */}
      <div className="flex-1 h-full border-r border-solid border-r-gray-200 dark:border-r-gray-200/20">
        {/* 展示当前用户信息 */}
        <div className="flex justify-between items-center pb-2 pl-6 pr-1 text-[#777888] border-b border-solid border-r-gray-200 dark:border-r-gray-200/20">
          <div className="flex items-center gap-2">
            <Image
              src={userInfo.avatar || `https://picsum.photos/120/80?random=1`}
              alt=""
              width={10}
              height={10}
              className="w-10 h-10 rounded-full"
            />
            <p>{userInfo.username}</p>
          </div>
          <HoverCard>
            <HoverCardTrigger>
              <div className="hover:bg-[#f0f0f3] rounded-full p-1 cursor-pointer">
                <Icon icon="gg:erase" size={22} />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="py-1 px-2 w-30 text-center">
              一键已读
            </HoverCardContent>
          </HoverCard>
        </div>
        {/* 展示会话历史列表 */}
        {sessionHistory.length > 0 &&
          sessionHistory.map((item) => {
            return (
              <div
                className={cn(
                  "flex gap-2 items-center pl-6 pr-2 py-4 text-[14px] border-b border-solid border-gray-200 dark:border-gray-200/20 hover:bg-[#efeff2] dark:hover:bg-[#121212] cursor-pointer",
                  item.chatUserId === selectedSession?.chatUserId &&
                    "bg-[#efeff2] dark:bg-[#121212]",
                )}
                key={item.sessionId}
                onClick={() => handleSelectSession(item)}
              >
                <div className="relative w-14 h-12">
                  {/* 用户头像 */}
                  <Image
                    src={
                      item.chatUserAvatar ||
                      `https://picsum.photos/120/80?random=1`
                    }
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
                      <p className="truncate text-[12px] w-32">
                        {item.latestMessage}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <p className="text-[12px] text-[#777888]">
                        {item.latestChatTime}
                      </p>
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
          })}
      </div>
      {/* 展示用户会话消息列表 */}
      <div className="w-270 h-full">
        {selectedSession.sessionId == 0 ? (
          <p className="text-center leading-130">
            您还未选中或者发起聊天, 快去跟好友聊一聊吧
          </p>
        ) : (
          <div>
            <div className="flex justify-between py-3 pl-4 border-b border-solid border-b-gray-200 dark:border-b-gray-200/20">
              <p>{selectedSession.chatUsername}</p>
              <Popover>
                <PopoverTrigger>
                  <Icon icon="lsicon:more-filled" className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-4 text-[14px]">
                    <div className="flex justify-between items-center">
                      <p>置顶聊天</p>
                      <Switch
                        checked={selectedSession.isPinned}
                        onCheckedChange={(checked) =>
                          handleUpdateSession("isPinned", checked)
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <p>消息免打扰</p>
                      <Switch
                        checked={selectedSession.isMuted}
                        onCheckedChange={(checked) =>
                          handleUpdateSession("isMuted", checked)
                        }
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2 max-h-84 h-84 overflow-y-auto pl-4 py-2">
              {chatMessages &&
                chatMessages.map((item) => {
                  return (
                    <div key={item.sendTime}>
                      <div className="text-center my-1 text-[10px] text-gray-400">
                        {item.sendTime}
                      </div>
                      {item.messages.length > 0 &&
                        item.messages.map((item) => {
                          return (
                            <div key={item.id}>
                              {item.userId === selectedSession.chatUserId ? (
                                <div
                                  className={cn(
                                    "flex gap-2 itmes-start justify-start",
                                  )}
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
                                  className={cn(
                                    "flex gap-2 itmes-start justify-end",
                                  )}
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
                  );
                })}
            </div>
            <MessageInputPane />
          </div>
        )}
      </div>
    </div>
  );
}
