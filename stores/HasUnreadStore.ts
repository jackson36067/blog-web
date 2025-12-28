import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  hasUnread: boolean;
};

type Actions = {
  setHasUnread: (hasUnread: boolean) => void;
  clearUnread: () => void;
};

const useUnreadStore = create<State & Actions>()(
  persist(
    (set) => ({
      hasUnread: false,

      setHasUnread: (hasUnread) =>
        set({
          hasUnread,
        }),

      clearUnread: () =>
        set({
          hasUnread: false,
        }),
    }),
    {
      name: "unread-status",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUnreadStore;
