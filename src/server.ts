import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import chatRoutes from "./routes/chatRoutes";
import { setupSocket } from "./sockets/socketHandler";

class App {
  private app: Application;
  private http: http.Server;
  private io: Server;

  constructor() {
    this.app = express();
    this.http = http.createServer(this.app);
    this.io = new Server(this.http);

    this.setupRoutes();
    this.listenSocket();
  }

  private setupRoutes() {
    this.app.use("/", chatRoutes);
  }

  private listenSocket() {
    setupSocket(this.io);
  }

  public listenServer() {
    this.http.listen(3000, () => console.log("Server is running"));
  }
}

const app = new App();
app.listenServer();