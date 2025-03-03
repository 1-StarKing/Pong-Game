import React, { useState } from "react";
import "./App.css";
import RoomForm from "./components/RoomForm";
import ThreeScene from "./components/ThreeScene";
import Lobby from "./components/Lobby";
import ContextProvider from "./ContextProvider";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isCreateRoom, setIsCreateRoom] = useState("");
  const showJoinOrCreateRoom = (joinOrCreateRoom: string): void => {
    setIsCreateRoom(joinOrCreateRoom);
  };
  return (
    <ContextProvider>
      <div className="App">
        <ThreeScene />
        <Lobby updateJoinOrCreateRoom={showJoinOrCreateRoom} />
        <RoomForm isCreateRoom={isCreateRoom} />
        <LoadingScreen />
      </div>
    </ContextProvider>
  );
}

export default App;
