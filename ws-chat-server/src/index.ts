import { WebSocketServer, WebSocket as wsType } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const chatRooms: Map<string, wsType[]> = new Map();

wss.on("connection", (socket) => {
  socket.onmessage = (e) => {
    const req = JSON.parse(e.data.toLocaleString());
    const payload = req.payload;
    if (req.type == "join") {
      // create a new room if it doesnt already exist
      if (!chatRooms.has(payload.roomId)) {
        chatRooms.set(payload.roomId, []);
      }

      // add user to that room
      chatRooms.get(payload.roomId)!.push(socket);

      console.log("user added to room", payload.roomId);
    } else if (req.type == "broadcast") {
      const room = chatRooms.get(payload.roomId);
      if (room) {
        for (const client of room) {
          const toSend = {
            type: "incoming",
            payload: {
              sender: payload.username,
              message: payload.message,
            },
          };
          client.send(JSON.stringify(toSend));
        }
      }
    }
  };
});
