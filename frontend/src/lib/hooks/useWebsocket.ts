// lib/hooks/useWebsocket.ts

import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const webSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const webSocket = new WebSocket(url);

    webSocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    webSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Check if the parsed data is an object (JSON)
        if (typeof data === 'object' && data !== null) {
          setMessages((prevMessages) => [...prevMessages, { text: data.text, isUser: false }]);
        } else {
          // Handle non-JSON messages here if needed
          console.log('Received non-JSON message:', event.data);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
        // Handle parsing errors here
      }
    };

    webSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    webSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    webSocketRef.current = webSocket;

    return () => {
      webSocket.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (webSocketRef.current?.readyState === WebSocket.OPEN) {
      webSocketRef.current.send(message);
      setMessages((prevMessages) => [...prevMessages, { text: message, isUser: true }]);
    } else {
      console.error('WebSocket is not open');
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
