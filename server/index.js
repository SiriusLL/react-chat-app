const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connect", (socket) => {
  console.log("new connection!!");

  socket.on("dixconnect", () => {
    console.log("User disconnect!!");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
