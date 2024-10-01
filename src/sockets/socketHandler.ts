import { Server, Socket } from "socket.io";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    let username = "Anonymous";

    socket.on("set username", (name) => {
      username = name || "Anonymous";
      socket.broadcast.emit("user connected", `${username} has joined the chat`);
    });

    socket.on("message", (data) => {
      console.log("Received message:", data);
      io.emit("message", { username, msg: data.msg });
    });

    socket.on("disconnect", () => {
      io.emit("user disconnected", `${username} has left the chat`);
    });
  });
};