import { Server, Socket } from "socket.io";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("user connected =>", socket.id);

    socket.broadcast.emit("user connected", "A user has joined the chat");

    socket.on("message", (msg) => {
      console.log("msg:", msg);
      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected =>", socket.id);
      io.emit("user disconnected", "A user has left the chat");
    });
  });
};
