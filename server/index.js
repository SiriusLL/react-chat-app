const http = require("http");
const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  console.log("new connection!!");

  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);

    const error = true;

    if (error) {
      callback({ error: "error" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnect!!");
  });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
