import useUnreadStore from "@/stores/HasUnreadStore";

interface WebSocketOptions {
  userId: number | string;
  url?: string;
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
  private reconnectInterval = 3000;
  private reconnectTimer: number | null = null;
  private manualClose = false;

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
    // 如果已有连接且用户一致，不再重复创建
    if (
      this.ws &&
      this.ws.readyState === WebSocket.OPEN &&
      this.userId === options.userId
    ) {
      console.log("[WS] 相同用户且连接已就绪，跳过建立");
      return;
    }

    this.destroy(); // 彻底清理旧的状态和连接

    this.userId = options.userId;
    this.url = options.url || `ws://localhost:8080/ws?userId=${options.userId}`;
    this.reconnectInterval = options.reconnectInterval || 3000;
    this.manualClose = false;
    this.lockReconnect = false;

    console.log(`[WS] 正在为用户 ${this.userId} 建立连接...`);
    this.createWebSocket();
  }

  /**
   * 订阅消息：组件挂载时调用
   * @returns 返回取消订阅的函数
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
        this.requestUnreadCount();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // 1. 全局内置逻辑处理
          if (data.type === "has_unread") {
            useUnreadStore.getState().setHasUnread(data.data);
          }

          // 2. 通知所有外部订阅者（如聊天组件、全局通知等）
          this.listeners.forEach((listener) => listener(data));
        } catch (err) {
          console.error("[WS] 解析消息失败", err);
        }
      };

      this.ws.onclose = (e) => {
        console.log(`[WS] 连接关闭: ${e.code} ${e.reason}`);
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

  private destroy() {
    this.manualClose = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      // 断开前移除监听，防止触发 onclose 中的重连逻辑
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
    } else {
      console.warn("[WS] 发送失败：连接未建立或正在重连");
    }
  }

  close() {
    this.destroy();
  }
}

export const WS = WSClient.getInstance();
