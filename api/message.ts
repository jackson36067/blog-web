import httpInstance from "@/utils/http";

// 获取会话历史
export const GetHistorySessionAPI = () => {
  return httpInstance({
    method: "GET",
    url: "/session/history",
  });
};

// 获取聊天记录
export const GetChatMessageAPI = (chatUserId: number) => {
  return httpInstance({
    method: "GET",
    url: `/message/chat/${chatUserId}`,
  });
};

// 更新会话信息
export const UpdateSessionAPI = (
  sessionId: number,
  // eslint-disable-next-line
  data: { field: string; value: any }[],
) => {
  const payload = Object.fromEntries(
    data.map((item) => [item.field, item.value]),
  );
  return httpInstance({
    method: "PUT",
    url: `/session/update/${sessionId}`,
    data: payload,
  });
};

// 获取除聊天其他类型的消息
export const GetOtherMessageAPI = (params: {
  page: number;
  pageSize: number;
  type: number;
}) => {
  return httpInstance({
    method: "GET",
    url: `/message/other`,
    params,
  });
};
