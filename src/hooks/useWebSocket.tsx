import { useEffect, useRef, useState } from "react";

const useWebSocket = (url: string) => {
  const ws = useRef<WebSocket | null>(null);
  const [messageState, setMessageState] = useState(null);

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = () => console.log("WebSocket connected");
    ws.current.onclose = () => console.log("WebSocket disconnected");
    ws.current.onmessage = (message) => {
      const msgData = JSON.parse(message.data);
      setMessageState(msgData);

      // move this to the RoomForm component ???
      if (msgData.type && msgData.type === "createRoom") {
        window.history.replaceState(
          null,
          "New Room Created",
          `/room/${msgData.roomName}`
        );
      } else if (msgData.type && msgData.type === "joinRoom") {
        window.history.replaceState(
          null,
          "Joined Room",
          `/room/${msgData.roomName}`
        );
      }
    };

    return () => {
      window.history.replaceState(
        null,
        "Left room",
        `/`
      );
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

  return { createRoom, joinRoom, messageState };
};

export default useWebSocket;
