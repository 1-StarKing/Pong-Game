import React, { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
interface RoomFormParams {
  isCreateRoom: string;
}

const RoomForm = ({ isCreateRoom }: RoomFormParams) => {
  const [roomName, setRoomName] = useState("");
  const [playerName, setPlayerName] = useState("");

  const title = isCreateRoom === "create" ? "Create" : "Join";

  const { createRoom } = useWebSocket("ws://localhost:8080");

  const handleRoomSubmit = () => {
    if (!roomName || !playerName)
      return alert("Please fill in both room name and player name.");

    if (isCreateRoom === "create") {
      createRoom(roomName, playerName);
    } else {
      //      joinRoom(roomName, playerName);
    }
  };

  if (isCreateRoom === "") return <></>;

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