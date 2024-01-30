type CallbackFunction = (data: any) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private callback: CallbackFunction | null = null;

  constructor() {
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(`wss://socket.polygon.io/crypto`);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.ws?.send(JSON.stringify({ action: 'auth', params: process.env.REACT_APP_POLYGON_API_KEY }));
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (this.callback) {
        this.callback(message);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
  }

  subscribeToChannel(channel: string) {
    this.ws?.send(JSON.stringify({ action: 'subscribe', params: channel }));
  }

  unsubscribeFromChannel(channel: string) {
    this.ws?.send(JSON.stringify({ action: 'unsubscribe', params: channel }));
  }

  setCallback(callback: CallbackFunction) {
    this.callback = callback;
  }
}

export const webSocketService = new WebSocketService();