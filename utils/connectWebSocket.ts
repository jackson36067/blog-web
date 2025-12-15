// connectWebSocket.ts

interface WebSocketOptions {
  userId: number | string
  url?: string
  heartbeatInterval?: number // 心跳间隔
  reconnectInterval?: number // 重连间隔
}

class WSClient {
  private static instance: WSClient
  private ws: WebSocket | null = null
  private userId: string | number = ''
  private url = ''
  private lockReconnect = false
  private heartbeatInterval = 20000
  private reconnectInterval = 3000
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private heartbeatTimer: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private reconnectTimer: any = null

  static getInstance() {
    if (!WSClient.instance) WSClient.instance = new WSClient()
    return WSClient.instance
  }

  connect(options: WebSocketOptions) {
    this.userId = options.userId
    this.url = options.url || `ws://localhost:8080/ws?userId=${options.userId}`
    this.heartbeatInterval = options.heartbeatInterval || 20000
    this.reconnectInterval = options.reconnectInterval || 3000

    if (this.ws && this.ws.readyState === WebSocket.OPEN) return

    this.createWebSocket()
  }

  private createWebSocket() {
    try {
      this.ws = new WebSocket(this.url)

      this.ws.onopen = () => {
        console.log('[WS] 已连接')
        this.startHeartbeat()
      }

      this.ws.onmessage = event => {
        console.log('[WS] 收到消息:', event.data)
        this.resetHeartbeat()
        this.onMessage(event.data)
      }

      this.ws.onclose = () => {
        console.log('[WS] 已关闭，准备重连...')
        this.reconnect()
      }

      this.ws.onerror = () => {
        console.log('[WS] 连接出错')
        this.reconnect()
      }
    } catch (e) {
      console.error('[WS] 创建连接失败', e)
      this.reconnect()
    }
  }

  private reconnect() {
    if (this.lockReconnect) return
    this.lockReconnect = true
    clearTimeout(this.reconnectTimer)

    this.reconnectTimer = setTimeout(() => {
      console.log('[WS] 重连中...')
      this.createWebSocket()
      this.lockReconnect = false
    }, this.reconnectInterval)
  }

  private startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }))
      }
    }, this.heartbeatInterval)
  }

  private resetHeartbeat() {
    clearInterval(this.heartbeatTimer)
    this.startHeartbeat()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send(data: any) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('[WS] 发送失败，连接未就绪')
      return
    }
    this.ws.send(JSON.stringify(data))
  }

  close() {
    this.ws?.close()
    clearInterval(this.heartbeatTimer)
    clearTimeout(this.reconnectTimer)
    console.log('[WS] 手动断开连接')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onMessage: (msg: any) => void = () => {}
}

export const WS = WSClient.getInstance()
