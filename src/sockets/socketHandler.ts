import { Server, Socket } from "socket.io";

const messages: { username: string; msg: string; time: string }[] = [];

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    let username = "Anonymous";

    socket.emit("load messages", messages);

    socket.on("set username", (name) => {
      username = name || "Anonymous";
      socket.broadcast.emit(
        "user connected",
        `${username} has joined the chat`
      );
    });

    socket.on("message", (data) => {
      console.log("Received message:", data);
      const timestamp = new Date().toISOString();
      const messageData = {
        username: data.username,
        msg: data.msg,
        time: timestamp,
      };
      messages.push(messageData);
      io.emit("message", messageData);
    });

    socket.on("disconnect", () => {
      io.emit("user disconnected", `${username} has left the chat`);
    });
  });
};
