import React, { useState, useContext } from "react";
import { MyContext } from "../ContextProvider";

interface LobbyParams {
  updateJoinOrCreateRoom: (joinOrCreateRoom: string) => void;
}

const Lobby = ({ updateJoinOrCreateRoom }: LobbyParams) => {
  const { playerConnected } = useContext(MyContext);
  const [joinOrCreateRoom, setJoinOrCreateRoom] = useState("");
  updateJoinOrCreateRoom(joinOrCreateRoom);
  
  const createRoom = () => {
    setJoinOrCreateRoom("create");
  };
  const joinRoom = () => {
    setJoinOrCreateRoom("join");
  };

  if (playerConnected) return <></>;

  return (
    <div>
      <button onClick={createRoom}>Create Room</button>
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default Lobby;
