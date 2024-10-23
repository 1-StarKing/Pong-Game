import { useEffect, useRef } from "react";

const useWebSocket = (url: string) => {
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = () => console.log("WebSocket connected");
    ws.current.onclose = () => console.log("WebSocket disconnected");
    ws.current.onmessage = (message) => {
      const createdRoom = JSON.parse(message.data);
      window.history.replaceState(
        null,
        "New Room Created",
        `/room/${createdRoom.roomName}`
      );
      alert(createdRoom.message);
    };

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
  const joinRoom = (roomName: string, playerName: string) => {
    const data = { roomName, playerName, type: "joinRoom" };

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  };
  return { createRoom, joinRoom };
};

export default useWebSocket;
