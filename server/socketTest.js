import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("✅ Connected to socket server");
});

socket.on("task-assigned", (data) => {
  console.log("🔥 Task Assigned Event:", data);
});
