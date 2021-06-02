import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    // const data = queryString.parse(location.search);
    // console.log("location.search-> ", location.search);
    // console.log("data-> ", data);
    const { name, room } = queryString.parse(location.search);
    console.log("data-> ", name, room);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // console.log("socket->", socket);
    socket.emit("join", { name: name, room: room }, ({ error }) => {
      alert(error);
    });
  }, [ENDPOINT, location.search]);
  return <h1>Chat</h1>;
};

export default Chat;
