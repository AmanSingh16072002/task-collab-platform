import { useEffect , useState } from "react";
import socket from "./socket";
import "./App.css";


function App() {
  const [events, setEvents]=useState([]);

  useEffect(() => {
    
    socket.on("connect", () => {
      console.log("🟢 Connected to socket:", socket.id);
    });

    socket.on("task-assigned", (data) => {
      console.log("🔥 Real-time task assigned:", data);

      setEvents((prev) => [
        ...prev,
        `${data.taskTitle} assigned to user ${data.assignedTo}`,
      ]);
      
    });

    return () => {
      socket.off("task-assigned");
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Collaboration Platform</h1>

      <h2>Live Events</h2>
      <ul>
        {events.map((e, i) => (
          <li key={i} className="event">{e}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
