export interface SessionItem {
  sessionId: number
  chatUserId: number
  chatUsername: string
  chatUserAvatar: string
  isPinned: boolean // 是否置顶
  isMuted: boolean // 是否静音
  latestMessage: string
  latestChatTime: string
  isFollow: boolean
  unreadCount: number // 未读消息数量
}
