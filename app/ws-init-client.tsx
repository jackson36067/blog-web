"use client";

import useUserStore from "@/stores/UserStore";
import { WS } from "@/utils/connectWebSocket";
import { useEffect } from "react";

export function WSInitializer() {
  const { userInfo } = useUserStore();

  useEffect(() => {
    const userId = userInfo.userId;
    if (!userId) return;
    WS.connect({ userId });
  }, [userInfo.userId]); // 仅在 userId 变化时重新运行

  return null;
}
