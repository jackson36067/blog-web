import { LoginResponse } from '@/types/login'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
type State = {
  userInfo: LoginResponse
}

type Actions = {
  setUserInfo: (user: LoginResponse) => void
  clearUserInfo: () => void
  updateUserEmail: (email: string) => void
}

const useUserStore = create<State & Actions>()(
  persist(
    set => ({
      userInfo: {
        userId: 0,
        username: '',
        nickname: '',
        avatar: '',
        token: '',
        email: '',
        codeAge: 0,
        fans: 0,
        following: 0,
        articleLikes: 0,
      },
      setUserInfo: (user: LoginResponse) =>
        set({
          userInfo: {
            userId: user.userId,
            username: user.username,
            nickname: user.nickname,
            avatar: user.avatar,
            token: user.token,
            email: user.email,
            codeAge: user.codeAge,
            fans: user.fans,
            following: user.following,
            articleLikes: user.articleLikes,
          },
        }),
      updateUserEmail: (email: string) =>
        set(state => ({
          userInfo: {
            ...state.userInfo,
            email: email,
          },
        })),
      clearUserInfo: () =>
        set({
          userInfo: {
            userId: 0,
            username: '',
            nickname: '',
            avatar: '',
            token: '',
            email: '',
            codeAge: 0,
            fans: 0,
            following: 0,
            articleLikes: 0,
          },
        }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useUserStore
