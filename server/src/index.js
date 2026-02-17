import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import boardRoutes from "./routes/board.routes.js";
import listRoutes from "./routes/list.routes.js";
import taskRoutes from "./routes/task.routes.js";



dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/tasks", taskRoutes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("disconnect",() =>{
    console.log("User disconnected:", socket.id);
  });
});

const PORT=process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export { io };
