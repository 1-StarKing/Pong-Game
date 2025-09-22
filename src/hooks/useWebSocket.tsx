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
    const keysPressed = new Set<string>();
    let animationFrame: number;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        keysPressed.add(event.key);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        keysPressed.delete(event.key);
      }
    };

    const sendMovementCommands = () => {
      const playerName = localStorage.getItem("playerName");
      if (!playerName || keysPressed.size === 0) {
        animationFrame = requestAnimationFrame(sendMovementCommands);
        return;
      }

      keysPressed.forEach((key) => {
        let direction: "up" | "down" | null = null;
        if (key === "ArrowUp") direction = "up";
        if (key === "ArrowDown") direction = "down";
        
        if (direction) {
          ws.current?.send(
            JSON.stringify({
              type: "move",
              roomName: players[0]?.roomName,
              playerName: playerName,
              direction,
            })
          );
        }
      });

      animationFrame = requestAnimationFrame(sendMovementCommands);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    // Start the movement loop
    sendMovementCommands();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrame);
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
