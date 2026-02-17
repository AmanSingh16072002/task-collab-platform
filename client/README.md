# Task Collaboration Platform 🚀

A full-stack **Task Collaboration Platform** (Trello/Notion–style) built as part of a Full Stack Internship assignment.  
It supports boards, lists, tasks, user assignment, authentication, and **real-time updates using Socket.io**.

---

## 🔥 Features

- 🔐 JWT-based Authentication
- 🗂️ Boards → Lists → Tasks structure
- 👤 Assign users to tasks
- ⚡ Real-time task assignment events (Socket.io)
- 🧠 Role-based access (board members only)
- 📡 REST APIs with Express & MongoDB
- 🎨 React + Vite frontend

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript
- CSS
- Socket.io-client

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io

---

## 📁 Project Structure
task-collab-platform/
│
├── client/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ ├── App.css
│ │ └── index.css
│ └── package.json
│
├── server/ # Backend (Node + Express)
│ ├── src/
│ │ ├── config/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ └── index.js
│ ├── .env
│ └── package.json
│
└── README.md

---

### 2️⃣ Setup Instructions (VERY important)


```md
## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas or local MongoDB
- Git

### Backend Setup

cd server
npm install
npm run dev

### Frontend Setup
cd client
npm install
npm run dev

🔗 API Overview

- POST `/api/auth/register` – Register user
- POST `/api/auth/login` – Login user
- POST `/api/boards` – Create board
- POST `/api/lists` – Create list
- POST `/api/tasks` – Create task
- PATCH `/api/tasks/:taskId/assign` – Assign user to task

## ⚡ Real-Time Features

- Uses Socket.io for real-time updates
- When a task is assigned, all connected clients receive an instant event
- Demonstrated via Live Events section in UI

