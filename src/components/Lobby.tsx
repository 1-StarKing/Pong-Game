import React, { useState } from "react";
interface LobbyParams {
  updateJoinOrCreateRoom: (joinOrCreateRoom: string) => void;
}

const Lobby = ({ updateJoinOrCreateRoom }: LobbyParams) => {
  const [joinOrCreateRoom, setJoinOrCreateRoom] = useState("");
  updateJoinOrCreateRoom(joinOrCreateRoom);
  return (
    <div>
      <button onClick={() => setJoinOrCreateRoom("create")}>Create Room</button>
      <button onClick={() => setJoinOrCreateRoom("join")}>Join Room</button>
    </div>
  );
};

export default Lobby;
