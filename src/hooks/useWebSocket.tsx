import { useEffect, useRef } from "react";

const useWebSocket = (url: string) => {
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = () => console.log("WebSocket connected");
    ws.current.onclose = () => console.log("WebSocket disconnected");

    return () => {
      ws.current?.close();
    };
  }, [url]);
  const createRoom = (roomName: string, playerName: string) => {
    const data = { roomName, playerName, type: "createRoom" };

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  };
  return { createRoom };
};

export default useWebSocket;
