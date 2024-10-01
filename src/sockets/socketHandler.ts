import { Server, Socket } from "socket.io";

const messages: { username: string; msg: string; time: string }[] = [];
const connectedUsers: { [id: string]: string } = {}; // Armazena usuários conectados pelo ID do socket

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    let username: string;

    socket.emit("load messages", messages);
    socket.emit("update user list", Object.values(connectedUsers));

    socket.on("set username", (name) => {
      username = name || "Anonymous";
      connectedUsers[socket.id] = username;

      socket.broadcast.emit("user connected", username);
      io.emit("update user list", Object.values(connectedUsers));
    });

    socket.on("disconnect", () => {
      if (connectedUsers[socket.id]) {
        socket.broadcast.emit("user disconnected", connectedUsers[socket.id]);
        delete connectedUsers[socket.id];
        io.emit("update user list", Object.values(connectedUsers));
      }
    });

    socket.on("message", (data) => {
      const timestamp = new Date().toISOString();
      const messageData = {
        username: data.username,
        msg: data.msg,
        time: timestamp,
      };
      messages.push(messageData);
      io.emit("message", messageData);
    });

    socket.on("typing", (username) => {
      socket.broadcast.emit("typing", username);
    });
  });
};
