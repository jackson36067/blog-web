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
  private heartbeatInterval = 20000; // 发送 ping 的间隔
  private reconnectInterval = 3000;

  private heartbeatTimer: number | null = null;
  private heartbeatTimeoutTimer: number | null = null; // 监控 pong 回包的计时器
  private reconnectTimer: number | null = null;
  private manualClose = false;

  private listeners = new Set<MessageListener>();

  private constructor() {}

  static getInstance() {
    if (!WSClient.instance) WSClient.instance = new WSClient();
    return WSClient.instance;
  }

  /**
   * 建立连接：自动清理旧连接
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

    this.destroy(); // 切换用户前必须彻底断开

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
   * 订阅消息：供 UI 组件调用
   */
  subscribe(callback: MessageListener) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private createWebSocket() {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log("[WS] 连接成功");
        this.startHeartbeat(); // 开启心跳轮询
        this.requestUnreadCount();
      };

      this.ws.onmessage = (event) => {
        // 【核心控制】只要收到任何消息，立刻停止“死亡倒计时”
        this.stopHeartbeatTimeout();

        try {
          const data = JSON.parse(event.data);

          // 1. 处理全局内置逻辑
          if (data.type === "has_unread") {
            useUnreadStore.getState().setHasUnread(data.data);
            return;
          }
          if (data.type === "pong") {
            // console.log("[WS] 心跳正常");
            return;
          }

          // 2. 转发业务消息给所有订阅组件
          this.listeners.forEach((listener) => {
            try {
              listener(data);
            } catch (e) {
              console.error("[WS] 订阅者处理消息报错:", e);
            }
          });
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
        console.error("[WS] 连接发生异常");
      };
    } catch (err) {
      console.error("[WS] 创建实例失败", err);
      this.reconnect();
    }
  }

  /**
   * 智能重连
   */
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

  /**
   * 心跳逻辑：发送 ping 并开启 pong 超时监控
   */
  private startHeartbeat() {
    this.stopHeartbeat(); // 清理旧的

    this.heartbeatTimer = window.setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        // 1. 发送 Ping
        this.ws.send(JSON.stringify({ type: "ping" }));

        // 2. 开启超时监控：如果 5 秒内没触发 onmessage，说明连接已死
        this.heartbeatTimeoutTimer = window.setTimeout(() => {
          console.warn("[WS] 心跳响应超时，连接可能已假死，强制断开重连");
          if (this.ws) {
            this.ws.close(); // 触发 onclose 逻辑
          }
        }, 5000);
      } else {
        this.stopHeartbeat();
      }
    }, this.heartbeatInterval);
  }

  /**
   * 停止所有心跳相关的计时器
   */
  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    this.stopHeartbeatTimeout();
  }

  /**
   * 停止 pong 超时监控
   */
  private stopHeartbeatTimeout() {
    if (this.heartbeatTimeoutTimer) {
      clearTimeout(this.heartbeatTimeoutTimer);
      this.heartbeatTimeoutTimer = null;
    }
  }

  /**
   * 彻底销毁连接
   */
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
