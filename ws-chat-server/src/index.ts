import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("client connected!");
  socket.send("server connected");
  socket.onmessage = (e) => {
    console.log(e.data.toString());
  };
});
