import React from "react";
import "./App.css";
import CreateRoom from "./components/CreateRoomForm";
import ThreeScene from "./components/ThreeScene";
import Lobby from "./components/Lobby";

function App() {
  const showJoinOrCreateRoom = (joinOrCreateRoom: string): void => {
    console.log(joinOrCreateRoom);
  };
  return (
    <div className="App">
      <ThreeScene />
      <Lobby updateJoinOrCreateRoom={showJoinOrCreateRoom} />
      <CreateRoom />
    </div>
  );
}

export default App;
