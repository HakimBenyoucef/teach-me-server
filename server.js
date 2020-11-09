const express = require("express");
const app = express();
const server = require("http").Server(app);
const { PeerServer } = require("peer");

/** Peer server config */
const peerServer = new PeerServer({ port: 5001, path: "/" });
peerServer.on("connection", (client) => {
  console.log("User connected with #", client.id);
});
peerServer.on("disconnect", (client) => {
  console.log("User disconnected with #", client.id);
});
/** END Peer server config */

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log(roomId, userId);
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

server.listen(5000);
console.log("listening on port ", 5000);
