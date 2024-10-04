import React, { useState } from "react";
import "./App.css";
import RoomForm from "./components/RoomForm";
import ThreeScene from "./components/ThreeScene";
import Lobby from "./components/Lobby";

function App() {
  const [isCreateRoom, setIsCreateRoom] = useState("");
  const showJoinOrCreateRoom = (joinOrCreateRoom: string): void => {
    setIsCreateRoom(joinOrCreateRoom);
  };
  return (
    <div className="App">
      <ThreeScene />
      <Lobby updateJoinOrCreateRoom={showJoinOrCreateRoom} />
      <RoomForm isCreateRoom={isCreateRoom} />
    </div>
  );
}

export default App;
