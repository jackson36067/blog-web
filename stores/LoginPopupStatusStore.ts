import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
type State = {
  open: boolean
}

type Actions = {
  setOpen: (isOpen: boolean) => void
}

const useLoginPopupStatusStore = create<State & Actions>()(
  persist(
    set => ({
      open: false,
      setOpen: isOpen =>
        set({
          open: isOpen,
        }),
    }),
    {
      name: 'login-popup-status',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useLoginPopupStatusStore
