import { SessionItem } from "@/types/message";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type State = {
  selectedSession: SessionItem;
};

type Actions = {
  newSelectSession: (item: SessionItem) => void;
  clearSelectSession: () => void;
};

const useSelectSessionStore = create<State & Actions>()(
  persist(
    (set) => ({
      selectedSession: {
        sessionId: 0,
        chatUserId: 0,
        chatUsername: "",
        chatUserAvatar: "",
        isPinned: false, // 是否置顶
        isMuted: false, // 是否静音
        latestMessage: "",
        latestChatTime: "",
        isFollow: false,
        unreadCount: 0, // 未读消息数量
      },
      newSelectSession: (item: SessionItem) =>
        set({
          selectedSession: item,
        }),
      clearSelectSession: () =>
        set({
          selectedSession: {
            sessionId: 0,
            chatUserId: 0,
            chatUsername: "",
            chatUserAvatar: "",
            isPinned: false, // 是否置顶
            isMuted: false, // 是否静音
            latestMessage: "",
            latestChatTime: "",
            isFollow: false,
            unreadCount: 0, // 未读消息数量
          },
        }),
    }),
    {
      name: "select-session",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useSelectSessionStore;
