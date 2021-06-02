const http = require("http");
const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

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
    //console.log(name, room);
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);
    //message to new user
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    //broadcast to all other users user has joined
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log("user", user);
    //wait for message to emit
    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    //console.log("User disconnect!!");
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
