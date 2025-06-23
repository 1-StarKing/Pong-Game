import React, { useEffect, useState, useContext } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { MyContext } from "../ContextProvider";

interface RoomFormParams {
  isCreateRoom: string;
}

const RoomForm = ({ isCreateRoom }: RoomFormParams) => {
  const [roomName, setRoomName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const { playerConnected, setPlayerConnected } = useContext(MyContext);

  const title = isCreateRoom === "create" ? "Create" : "Join";

  const { createRoom, joinRoom, players } = useWebSocket("ws://localhost:8080");

  const handleRoomSubmit = () => {
    if (!roomName || !playerName)
      return alert("Please fill in both room name and player name.");

    if (isCreateRoom === "create") {
      createRoom(roomName, playerName);
    } else {
      joinRoom(roomName, playerName);
    }
  };

  useEffect(() => {
    if (players.length) {
      const player = players.find((p) => {
        return p.playerName === playerName;
      });

      // console.log(player);

      if (player?.playerName === playerName && player?.roomName === roomName)
        setPlayerConnected(true);
      // console.log("Component Message updated:", players);
    }
  }, [players]);

  if (isCreateRoom === "" || playerConnected) return <></>;

  return (
    <div>
      <h2>{title} a Room</h2>
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={handleRoomSubmit}>{title} Room</button>
    </div>
  );
};

export default RoomForm;
