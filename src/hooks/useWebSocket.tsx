/*
  console log returning null
*/

import { useEffect, useRef, useState } from "react";

const useWebSocket = (url: string) => {
  const ws = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = () => console.log("WebSocket connected");
    ws.current.onclose = () => console.log("WebSocket disconnected");
    ws.current.onmessage = (message) => {
      const msgData = JSON.parse(message.data);

      setMessage(msgData);

      console.log(1, msgData);

      if (msgData.type && msgData.type === "createRoom") {
        window.history.replaceState(
          null,
          "New Room Created",
          `/room/${msgData.roomName}`
        );
        alert(msgData.message);
      }
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

  const getMsgData = () => {
    console.log(2, message);
    return message;
  };

  return { createRoom, joinRoom, getMsgData };
};

export default useWebSocket;
