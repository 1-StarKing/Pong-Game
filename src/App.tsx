import React from "react";
import "./App.css";
import ThreeScene from "./components/ThreeScene";
import useWebSocket from "./hooks/useWebSocket";

function App() {
  const { sendMessage } = useWebSocket("ws://localhost:8080");
  return (
    <div className="App">
      <ThreeScene />
      <button onClick={() => sendMessage("Hello WebSocket!")}>
        Send Message
      </button>
    </div>
  );
}

export default App;
