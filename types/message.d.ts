export interface SessionItem {
  sessionId: number;
  chatUserId: number;
  chatUsername: string;
  chatUserAvatar: string;
  isPinned: boolean; // 是否置顶
  isMuted: boolean; // 是否静音
  latestMessage: string;
  latestChatTime: string;
  isFollow: boolean;
  unreadCount: number; // 未读消息数量
}

export interface GroupChatMessageItem {
  sendTime: string;
  messages: ChatMessageItem[];
}

export interface ChatMessageItem {
  id: number;
  userId: number;
  username: string;
  userAvatar: string;
  chatUserId: number;
  chatUsername: string;
  chatUserAvatar: string;
  message: string;
  sendTime: string;
}

export interface OtherMessageItem {
  id: number; // 消息id
  userId: number;
  username: string;
  userAvatar: string;
  message: string;
  actionMessage: string;
  sendTime: string;
  extra: string;
  title: string;
  isFollow: boolean;
}

export interface PrivateSendMessageItem {
  sessionId: number;
  message: ChatMessageItem;
  sendTime: string;
  chatTime: string;
}
