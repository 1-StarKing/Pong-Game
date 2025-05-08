import { useContext, useEffect, useRef } from "react";
import { MyContext } from "../ContextProvider";

/*
type MessageType = {
  message: string;
  roomName: string;
  type: "createRoom" | "joinRoom";
  playerName: string;
  playerID: string;
};
*/

const useWebSocket = (url: string) => {
  const ws = useRef<WebSocket | null>(null);
  const { players, setPlayers } = useContext(MyContext);

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = () => console.log("WebSocket connected");
    ws.current.onclose = () => console.log("WebSocket disconnected");
    ws.current.onmessage = (message) => {
      const msgData = JSON.parse(message.data);
      setPlayers(msgData);

      /*
        TODO: msgdata is now array of players. adjust logic related to msgdata to the new data struct.
      */
      console.log(msgData);

      // move this to the RoomForm component ???
      if (msgData.length) {
        if (msgData[0].type && msgData[0].type === "createRoom") {
          window.history.replaceState(
            null,
            "New Room Created",
            `/room/${msgData[0].roomName}`
          );
        } else if (msgData[1].type && msgData[1].type === "joinRoom") {
          window.history.replaceState(
            null,
            "Joined Room",
            `/room/${msgData[1].roomName}`
          );
        }
      }
    };

    return () => {
      window.history.replaceState(null, "Left room", `/`);
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

  return { createRoom, joinRoom, players };
};

export default useWebSocket;
