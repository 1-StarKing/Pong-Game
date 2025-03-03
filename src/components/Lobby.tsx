import React, { useState, useContext } from "react";
import { MyContext } from "../ContextProvider";

interface LobbyParams {
  updateJoinOrCreateRoom: (joinOrCreateRoom: string) => void;
}

const Lobby = ({ updateJoinOrCreateRoom }: LobbyParams) => {
  const { playerConnected } = useContext(MyContext);
  const [joinOrCreateRoom, setJoinOrCreateRoom] = useState("");
  updateJoinOrCreateRoom(joinOrCreateRoom);

  if (playerConnected) return <></>;

  return (
    <div>
      <button onClick={() => setJoinOrCreateRoom("create")}>Create Room</button>
      <button onClick={() => setJoinOrCreateRoom("join")}>Join Room</button>
    </div>
  );
};

export default Lobby;
