const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid"); // Using UUID for unique identifiers
const wss = new WebSocket.Server({ port: 8080 });

// Object to hold all rooms
const rooms = {};
let players = [];

wss.on("connection", (ws) => {
  ws.id = uuidv4(); // Assign a unique ID to each client
  console.log(`Client connected with ID: ${ws.id}`);

  console.log("connected");
  let assignedRoom;
  const roomResponse = {
    message: ``,
    roomName: "",
    type: "",
    playerName: "",
    playerID: ws.id,
  };

  ws.on("message", (message) => {
    const { type, roomName, playerName } = JSON.parse(message);
    roomResponse.type = type;
    roomResponse.roomName = roomName;
    roomResponse.playerName = playerName;
    ws.playerName = playerName;
    assignedRoom = roomName.replace(" ", "-");

    if (!rooms[assignedRoom] && type === "joinRoom") {
      roomResponse.message = `Room doesn't exist`;
      return ws.send(JSON.stringify(roomResponse));
    }

    players.push(roomResponse);

    if (type === "createRoom") {
      if (!rooms[assignedRoom]) {
        rooms[assignedRoom] = {};
        rooms[assignedRoom]["sockets"] = [ws];
        rooms[assignedRoom]["roomName"] = assignedRoom;
        rooms[assignedRoom]["players"] = [playerName];
        roomResponse.message = `Player ${playerName} created room ${assignedRoom}`;
        // players.push(roomResponse);
        ws.send(JSON.stringify(players));
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
        roomResponse.message = `Player ${playerName} joined room ${assignedRoom}`;
        // players.push(roomResponse);
        ws.send(JSON.stringify(players));
      } else {
        roomResponse.message = `Room already full`;
        ws.send(JSON.stringify(roomResponse));
      }
    }

    console.log(players);

    // Broadcast to the other player in the same room
    if (rooms[assignedRoom]) {
      rooms[assignedRoom].sockets.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(roomResponse));
        }
      });
    }
  });

  ws.on("close", () => {
    if (
      rooms[assignedRoom] &&
      rooms[assignedRoom]["players"].length &&
      rooms[assignedRoom]["sockets"].length
    ) {
      rooms[assignedRoom]["players"] = rooms[assignedRoom]["players"].filter(
        (player) => player !== ws.playerName
      );
      rooms[assignedRoom]["sockets"] = rooms[assignedRoom]["sockets"].filter(
        (client) => client !== ws
      );
      roomResponse.message = `Player ${ws.playerName} left room ${assignedRoom}`;
      players = players.filter((pl) => pl.playerName !== ws.playerName);
      rooms[assignedRoom]["sockets"][0]?.send(JSON.stringify(roomResponse));
    }

    // If the room is empty, delete it
    if (rooms[assignedRoom] && rooms[assignedRoom]["sockets"].length === 0) {
      delete rooms[assignedRoom];
    }
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
