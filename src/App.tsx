import React from "react";
import "./App.css";
import CreateRoom from "./components/CreateRoomForm";
import ThreeScene from "./components/ThreeScene";

function App() {
  return (
    <div className="App">
      <ThreeScene />
      <CreateRoom />
    </div>
  );
}

export default App;
