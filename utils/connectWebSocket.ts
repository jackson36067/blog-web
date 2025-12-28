import useUnreadStore from "@/stores/HasUnreadStore";

interface WebSocketOptions {
  userId: number | string;
  url?: string;
  heartbeatInterval?: number;
  reconnectInterval?: number;
}

// eslint-disable-next-line
type MessageListener = (data: any) => void;

class WSClient {
  private static instance: WSClient;
  private ws: WebSocket | null = null;
  private userId: string | number = "";
  private url = "";

  private lockReconnect = false;
  private heartbeatInterval = 20000;
  private reconnectInterval = 3000;

  private heartbeatTimer: number | null = null;
  private reconnectTimer: number | null = null;
  private manualClose = false;
  private heartbeatTimeoutTimer: number | null = null;

  // 使用 Set 存储多个监听器，支持多组件同时监听
  private listeners = new Set<MessageListener>();

  private constructor() {}

  static getInstance() {
    if (!WSClient.instance) WSClient.instance = new WSClient();
    return WSClient.instance;
  }

  /**
   * 建立连接：会自动清理旧连接
   */
  connect(options: WebSocketOptions) {
    if (
      this.ws &&
      this.ws.readyState === WebSocket.OPEN &&
      this.userId === options.userId
    ) {
      console.log("[WS] 相同用户且连接已就绪，跳过建立");
      return;
    }

    this.destroy(); // 彻底清理旧的状态

    this.userId = options.userId;
    this.url = options.url || `ws://localhost:8080/ws?userId=${options.userId}`;
    this.heartbeatInterval = options.heartbeatInterval || 20000;
    this.reconnectInterval = options.reconnectInterval || 3000;
    this.manualClose = false;
    this.lockReconnect = false;

    console.log(`[WS] 正在为用户 ${this.userId} 建立连接...`);
    this.createWebSocket();
  }

  /**
   * 订阅消息：组件挂载时调用
   */
  subscribe(callback: MessageListener) {
    this.listeners.add(callback);
    // 返回取消订阅函数，方便在 useEffect 的 return 中调用
    return () => {
      this.listeners.delete(callback);
    };
  }

  private createWebSocket() {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log("[WS] 连接成功");
        this.startHeartbeat();
        this.requestUnreadCount();
      };

      this.ws.onmessage = (event) => {
        this.startHeartbeat(); // 收到任何消息都重置心跳计时器

        try {
          const data = JSON.parse(event.data);

          // 1. 全局内置逻辑处理
          if (data.type === "has_unread") {
            useUnreadStore.getState().setHasUnread(data.data);
          }
          if (data.type === "pong") return;

          // 2. 通知所有外部订阅者（如聊天组件）
          this.listeners.forEach((listener) => listener(data));
        } catch (err) {
          console.error("[WS] 解析消息失败", err);
        }
      };

      this.ws.onclose = (e) => {
        console.log(`[WS] 连接关闭: ${e.code} ${e.reason}`);
        this.stopHeartbeat();
        this.reconnect();
      };

      this.ws.onerror = () => {
        console.error("[WS] 连接异常");
      };
    } catch (err) {
      console.error("[WS] 创建实例失败", err);
      this.reconnect();
    }
  }

  private reconnect() {
    if (this.lockReconnect || this.manualClose) return;

    this.lockReconnect = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);

    this.reconnectTimer = window.setTimeout(() => {
      console.log("[WS] 执行自动重连...");
      this.createWebSocket();
      this.lockReconnect = false;
    }, this.reconnectInterval);
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatTimer = window.setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        // 发送 ping
        this.ws.send(JSON.stringify({ type: "ping" }));

        // --- 新增：心跳超时检测 ---
        // 如果在心跳间隔的一半时间内没有任何消息返回，认为连接已断
        if (this.heartbeatTimeoutTimer)
          clearTimeout(this.heartbeatTimeoutTimer);
        this.heartbeatTimeoutTimer = window.setTimeout(() => {
          if (this.ws) {
            console.warn("[WS] 心跳响应超时，强制断开重连");
            this.ws.close(); // 触发 onclose 逻辑进入重连
          }
        }, 5000); // 5秒内没回 pong 就判定死亡
      }
    }, this.heartbeatInterval);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    if (this.heartbeatTimeoutTimer) {
      clearTimeout(this.heartbeatTimeoutTimer);
      this.heartbeatTimeoutTimer = null;
    }
  }

  private destroy() {
    this.manualClose = true;
    this.stopHeartbeat();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onerror = null;
      this.ws.onclose = null;
      this.ws.close();
      this.ws = null;
    }
    this.lockReconnect = false;
  }

  private requestUnreadCount() {
    this.send({ type: "check_unread", userId: this.userId });
  }

  // eslint-disable-next-line
  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(data));
      } catch (err) {
        console.error("[WS] 发送失败", err);
      }
    }
  }

  close() {
    this.destroy();
  }
}

export const WS = WSClient.getInstance();
