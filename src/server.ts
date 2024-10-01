import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import chatRoutes from "./routes/chatRoutes"; // Ajuste para o caminho correto da rota
import { setupSocket } from "./sockets/socketHandler";
import path from "path";

class App {
  private app: Application;
  private http: http.Server;
  private io: Server;

  constructor() {
    this.app = express();
    this.http = http.createServer(this.app);
    this.io = new Server(this.http);

    this.setupStaticFiles();
    this.setupRoutes();
    this.listenSocket();
  }

  private setupStaticFiles() {
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  private setupRoutes() {
    this.app.use("/", chatRoutes);
  }

  private listenSocket() {
    setupSocket(this.io);
  }

  public listenServer() {
    this.http.listen(3000, () =>
      console.log("Server is running on http://localhost:3000")
    );
  }
}

const app = new App();
app.listenServer();
