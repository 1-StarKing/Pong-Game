const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

// Object to hold all rooms
const rooms = {};

wss.on("connection", (ws) => {
  let assignedRoom;
  console.log("connected");

  ws.on("message", (message) => {
    const { type, roomName, playerName } = JSON.parse(message);

    assignedRoom = roomName.replace(" ", "-");

    const roomResponse = {
      message: ``,
      roomName: roomName,
    };

    if (!rooms[assignedRoom] && type === "joinRoom") {
      roomResponse.message = `Room doesn't exist`;
      return ws.send(JSON.stringify(roomResponse));
    }

    if (type === "createRoom") {
      if (!rooms[assignedRoom]) {
        rooms[assignedRoom] = {};
        rooms[assignedRoom]["sockets"] = [ws];
        rooms[assignedRoom]["roomName"] = assignedRoom;
        rooms[assignedRoom]["players"] = [playerName];
        roomResponse.message = `Welcome to Pong Game WebSocket server, you are in room ${assignedRoom}`;
        ws.send(JSON.stringify(roomResponse));
      } else {
        roomResponse.message = `Room already exists`;
        ws.send(JSON.stringify(roomResponse));
      }
    }

    if (type === "joinRoom") {
      if (
        rooms[assignedRoom] &&
        rooms[assignedRoom].roomName === assignedRoom &&
        rooms[assignedRoom].players.length < 2
      ) {
        rooms[assignedRoom]["sockets"].push(ws);
        rooms[assignedRoom]["players"].push(playerName);
        roomResponse.message = `Welcome to Pong Game WebSocket server, you joined room ${assignedRoom}`;
        ws.send(JSON.stringify(roomResponse));
      } else {
        roomResponse.message = `Room already full`;
        ws.send(JSON.stringify(roomResponse));
      }
    }

    // Broadcast to the other player in the same room
    if (rooms[assignedRoom]) {
      rooms[assignedRoom].sockets.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  });

  ws.on("close", () => {
    // Remove the player from the room when they disconnect
    //rooms[assignedRoom] = rooms[assignedRoom].filter((client) => client !== ws);
    // If the room is empty, delete it
    // if (rooms[assignedRoom].length === 0) {
    //   delete rooms[assignedRoom];
    // }
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
