const io = require("socket.io")(5000);

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("join-room", (roomId, userId) => {
    console.log(roomId, userId);
  });
});
