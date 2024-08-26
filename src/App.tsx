import React from "react";
import "./App.css";
import ThreeScene from "./components/ThreeScene";
import useWebSocket from "./hooks/useWebSocket";

function App() {
  const { sendMessage } = useWebSocket("ws://localhost:8080");
  const sendMessageTest = () => {
    sendMessage("Hello WebSocket!");
  };
  return (
    <div className="App">
      <ThreeScene />
      <button onClick={sendMessageTest}>Send Message</button>
    </div>
  );
}

export default App;
