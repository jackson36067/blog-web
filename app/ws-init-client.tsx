'use client'

import useUserStore from '@/stores/UserStore'
import { WS } from '@/utils/connectWebSocket'
import { useEffect } from 'react'

export function WSInitializer() {
  const { userInfo } = useUserStore()
  useEffect(() => {
    const userId = userInfo.userId
    if (userId) {
      WS.connect({ userId })
    }
  }, [userInfo.userId])

  return null // 不渲染任何东西，只负责初始化
}
