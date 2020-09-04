const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
// middlewares
app.use(cors());
app.use(express.json());
// routes
const chatRoute = require("./routes/chat/chat");
app.use("/chatRoom", chatRoute);
const server = http.createServer(app);
const io = socketio(server); //instance of socket io
io.on("connection", (socket) => {
  console.log("user connect");

  socket.on("join", ({ name, activeRoom }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, activeRoom });
    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome in the room ${user.activeRoom}`,
    });
    socket.broadcast
      .to(user.activeRoom)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });
    socket.join(user.activeRoom);
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.activeRoom).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    console.log("User had left!");
  });
});

server.listen(port, () => console.log("listening on port: ", port));
