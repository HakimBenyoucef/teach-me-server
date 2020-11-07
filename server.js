const express = require("express");
const app = express();
const server = require("http").Server(app);

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log(roomId, userId);
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
  });
});

server.listen(5000);
console.log("listening on port ", 5000);
