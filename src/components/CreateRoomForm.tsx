import React, { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [playerName, setPlayerName] = useState("");

  const { createRoom } = useWebSocket("ws://localhost:8080");

  const handleCreateRoom = () => {
    if (roomName && playerName) {
      createRoom(roomName, playerName);
    } else {
      alert("Please fill in both room name and player name.");
    }
  };

  return (
    <div>
      <h2>Create a Room</h2>
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
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  );
};

export default CreateRoom;
