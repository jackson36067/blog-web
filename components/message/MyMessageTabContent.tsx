"use client";
import {
  DeleteSessionAPI,
  GetChatMessageAPI,
  GetHistorySessionAPI,
  GetOrCreateSessionAPI,
  UpdateSessionAPI,
} from "@/api/message";
import useUserStore from "@/stores/UserStore";
import { GroupChatMessageItem, SessionItem } from "@/types/message";
import Image from "next/image";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import Icon from "../Icon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import MessageInputPane from "./chat/MessageInputPane";
import useSelectSessionStore from "@/stores/SelectSessionStore";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import SessionItemPane from "./chat/SessionItemPane";
import MessageItemPane from "./chat/MessageItemPane";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogDescription,
} from "../ui/alert-dialog";
import { WS } from "@/utils/connectWebSocket";
import { useSearchParams } from "next/navigation";

export default function MyMessageTabContent() {
  // 聊天用户
  const chatUsername = useSearchParams().get("username");
  const { selectedSession, newSelectSession } = useSelectSessionStore();
  // 保存用户会话历史
  const [sessionHistory, setSessionHistory] = useState<SessionItem[]>([]);
  const { userInfo } = useUserStore();
  // 保存用户聊天记录
  const [chatMessages, setChatMessages] = useState<GroupChatMessageItem[]>([]);
  // 是否展示右键菜单
  const [showContextMenu, setShowContextMenu] = useState(false);
  // 右键菜单位置
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  // 右键选择的会话信息
  const [contextMenuSession, setContextMenuSession] = useState<SessionItem>();
  // 是否删除对话提示弹窗
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // 让消息列表滚动到底部
  const boxRef = useRef<HTMLDivElement>(null);

  // 获取会话历史
  const getSessionHistory = useCallback(async () => {
    const res = await GetHistorySessionAPI();
    // 由于可能带上路径参数，防止丢失该用户会话
    setSessionHistory((prev) => {
      if (!Array.isArray(res.data) || res.data.length === 0) {
        return prev;
      }
      const existIds = new Set(prev.map((i) => i.sessionId));
      const filtered = res.data.filter((item) => !existIds.has(item.sessionId));
      return filtered.length > 0 ? [...prev, ...filtered] : prev;
    });
  }, []);
  useEffect(() => {
    // 如果带上了聊天用户，则获取该用户会话
    if (chatUsername != null) {
      const getChatSession = async () => {
        const res = await GetOrCreateSessionAPI({ username: chatUsername });
        setSessionHistory((prev) => {
          const exists = prev.some(
            (item) => item.sessionId === res.data.sessionId,
          );
          return exists ? prev : [...prev, res.data];
        });
        // 更新选中的会话
        newSelectSession(res.data);
      };
      getChatSession();
    }
    // eslint-disable-next-line
    getSessionHistory();
    return () => {
      // 组件卸载时, 如果有聊天用户, 则清空选中的会话
      if (chatUsername != null) {
        newSelectSession({
          sessionId: 0,
          chatUserId: 0,
          chatUsername: "",
          chatUserAvatar: "",
          isPinned: false,
          isMuted: false,
          latestMessage: "",
          latestChatTime: "",
          isFollow: false,
          unreadCount: 0,
        });
      }
    };
  }, [getSessionHistory, chatUsername, newSelectSession]);

  useEffect(() => {
    if (selectedSession.sessionId === 0) return;
    const getChatMessages = async () => {
      // 获取聊天记录
      const res = await GetChatMessageAPI(selectedSession.sessionId);
      setChatMessages(res.data);
      // 使用函数式更新，避免把 sessionHistory 放进依赖
      setSessionHistory((prev) =>
        prev.map((item) =>
          item.sessionId === selectedSession.sessionId
            ? { ...item, unreadCount: 0 }
            : item,
        ),
      );
    };
    getChatMessages();
  }, [selectedSession.sessionId, userInfo.userId]);

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

  // 监听鼠标右键点击事件
  const handleContextMenu = (event: MouseEvent, session: SessionItem) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenuPosition({
      x: event.clientX,
      y: event.clientY,
    });
    setShowContextMenu(true);
    setContextMenuSession(session);
  };

  // 关闭右键菜单
  const closeMenu = () => {
    setShowContextMenu(false);
  };

  useEffect(() => {
    if (!showContextMenu) return;

    const handleClick = () => {
      closeMenu();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showContextMenu]);

  // 删除会话
  const handleDeleteSession = async () => {
    // 如果删除的是当前选中的会话，则清空选中状态
    if (
      selectedSession != undefined &&
      contextMenuSession?.sessionId === selectedSession.sessionId
    ) {
      newSelectSession({
        sessionId: 0,
        chatUserId: 0,
        chatUsername: "",
        chatUserAvatar: "",
        isPinned: false,
        isMuted: false,
        latestMessage: "",
        latestChatTime: "",
        isFollow: false,
        unreadCount: 0,
      });
    }
    // 删除会话
    await DeleteSessionAPI(contextMenuSession?.sessionId || 0);
    // 重新获取会话列表
    getSessionHistory();
  };

  // 用 Ref 永远指向当前的 sessionId
  const selectedIdRef = useRef(selectedSession.sessionId);
  useEffect(() => {
    selectedIdRef.current = selectedSession.sessionId;
  }, [selectedSession.sessionId]);

  useEffect(() => {
    // 定义处理函数
    // eslint-disable-next-line
    const handlerMessage = (data: any) => {
      if (data.type === "chat") {
        const chatMessage = data.data;
        console.log(data.data);
        const currentSelected = selectedIdRef.current; // 从 Ref 获取最新值
        if (currentSelected === chatMessage.sessionId) {
          setSessionHistory((prev) =>
            prev.map((item) =>
              item.sessionId === chatMessage.sessionId
                ? {
                    ...item,
                    latestChatTime: chatMessage.chatTime,
                    latestMessage: chatMessage.message.message,
                  }
                : item,
            ),
          );
          setChatMessages((prevMessages) => {
            const newMessages =
              prevMessages.length > 0 ? [...prevMessages] : [];
            const index = newMessages.findIndex(
              (item) => item.sendTime === chatMessage.sendTime,
            );
            // 如果有一样的发送时间, 则直接添加消息进入
            if (index > -1) {
              const updatedGroup = {
                ...newMessages[index],
                messages: [...newMessages[index].messages, chatMessage.message],
              };
              newMessages[index] = updatedGroup;
            } else {
              // 如果没有一样的发送时间, 则新增一个消息组
              newMessages.push({
                sendTime: chatMessage.sendTime,
                messages: [chatMessage.message],
              });
            }
            return newMessages;
          });
        } else {
          setSessionHistory((prev) =>
            prev.map((item) =>
              item.sessionId === chatMessage.sessionId
                ? {
                    ...item,
                    unreadCount: item.unreadCount + 1,
                    latestChatTime: chatMessage.chatTime,
                    latestMessage: chatMessage.message.message,
                  }
                : item,
            ),
          );
        }
      }
    };
    // 订阅消息，并获取取消订阅的函数
    const unsubscribe = WS.subscribe(handlerMessage);

    return () => {
      // 组件卸载时，只移除自己的监听器，不影响全局
      unsubscribe();
    };
  }, [selectedSession]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [chatMessages]); // 消息变化时滚到底

  return (
    <div className="flex relative h-140">
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
              <SessionItemPane
                key={item.sessionId}
                selectedSession={selectedSession}
                item={item}
                handleSelectSession={() => handleSelectSession(item)}
                handelContextMenu={(event, session) =>
                  handleContextMenu(event, session)
                }
              />
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
            <div
              className="flex flex-col gap-2 max-h-84 h-84 overflow-y-auto pl-4 py-2"
              ref={boxRef}
            >
              {chatMessages &&
                chatMessages.map((item) => {
                  return (
                    <MessageItemPane
                      key={item.sendTime}
                      selectedSession={selectedSession}
                      item={item}
                    />
                  );
                })}
            </div>
            <MessageInputPane />
          </div>
        )}
      </div>
      {/* 右键菜单 */}
      {showContextMenu && (
        <div
          className="fixed z-50 flex flex-col gap-2 bg-white dark:bg-[#212121] rounded-md shadow-lg py-2 cursor-pointer text-[14px] [&>div]:px-4 [&>div]:py-2 [&>div:hover]:bg-gray-100 dark:[&>div:hover]:bg-[#2a2a2a]"
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
          }}
        >
          <div
            onClick={() =>
              window.open(
                `/my?username=${contextMenuSession?.chatUsername}`,
                "_blank",
              )
            }
          >
            进入个人主页
          </div>
          <div
            onClick={() =>
              handleUpdateSession("isPinned", !contextMenuSession?.isPinned)
            }
          >
            {contextMenuSession?.isPinned ? "取消置顶" : "置顶"}
          </div>
          <div
            onClick={() =>
              handleUpdateSession("isMuted", !contextMenuSession?.isMuted)
            }
          >
            {contextMenuSession?.isMuted ? "取消免打扰" : "免打扰"}
          </div>
          <div onClick={() => setShowDeleteDialog(true)}>删除对话</div>
        </div>
      )}
      {/* 弹窗放在外层 */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确定删除该对话吗？</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteSession()}>
              确定
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
