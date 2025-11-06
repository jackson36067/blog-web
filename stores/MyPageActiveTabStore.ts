import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
type State = {
  activeTab: string
}

type Actions = {
  setActiveTab: (activeTabTitle: string) => void
}

const useMyPageActiveTabStore = create<State & Actions>()(
  persist(
    set => ({
      activeTab: '我的文章',
      setActiveTab: activeTagTitle =>
        set({
          activeTab: activeTagTitle,
        }),
    }),
    {
      name: 'my-page-active-tab',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useMyPageActiveTabStore
