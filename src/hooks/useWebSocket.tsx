import { useContext, useEffect, useRef } from "react";
import { MyContext } from "../ContextProvider";

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
      

      // move this to the RoomForm component ???
      if (msgData.length) {
        if (msgData[0]?.type && msgData[0]?.type === "createRoom") {
          window.history.replaceState(
            null,
            "New Room Created",
            `/room/${msgData[0].roomName}`
          );
        } else if (msgData[1]?.type && msgData[1]?.type === "joinRoom") {
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // gets playerName from each players browser, not working on the same browser
      // this is because localStorage is not shared between different browser tabs or windows
      const playerName = localStorage.getItem("playerName");
      if (!playerName) return; // Only act if you know your ID

      let direction: "up" | "down" | null = null;
      if (event.key === "ArrowUp") direction = "up";
      if (event.key === "ArrowDown") direction = "down";
      if (!direction) return;

      // Send move command to server
      ws.current?.send(
        JSON.stringify({
          type: "move",
          roomName: players[0]?.roomName, // Assuming roomName is the same for all players
          playerName: playerName,
          direction,
        })
      );
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [players]);

  const createRoom = (roomName: string, playerName: string) => {
    const data = { roomName, playerName, type: "createRoom" };
    
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
      localStorage.setItem("playerName", playerName);
    }
  };
  const joinRoom = (roomName: string, playerName: string) => {
    const data = { roomName, playerName, type: "joinRoom" };
    
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
      localStorage.setItem("playerName", playerName);
    }
  };

  return { createRoom, joinRoom, players };
};

export default useWebSocket;
