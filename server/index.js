const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

// Object to hold all rooms
const rooms = {};

wss.on("connection", (ws) => {
  let assignedRoom;

  // Assign player to a room
  for (const roomId in rooms) {
    if (rooms[roomId].length < 2) {
      rooms[roomId].push(ws);
      assignedRoom = roomId;
      break;
    }
  }

  // If no room is available or all rooms are full, create a new room
  if (!assignedRoom) {
    assignedRoom = `room-${Object.keys(rooms).length + 1}`;
    rooms[assignedRoom] = [ws];
  }

  ws.send(`Welcome to Pong Game WebSocket server, you are in ${assignedRoom}`);

  ws.on("message", (message) => {
    console.log(`received from ${assignedRoom}: %s`, message);

    // Broadcast to the other player in the same room
    rooms[assignedRoom].forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    // Remove the player from the room when they disconnect
    rooms[assignedRoom] = rooms[assignedRoom].filter((client) => client !== ws);

    // If the room is empty, delete it
    if (rooms[assignedRoom].length === 0) {
      delete rooms[assignedRoom];
    }
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
