# Task Collaboration Platform

A real-time task collaboration platform built as a Full Stack Internship assignment.

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB (Atlas)
- Authentication: JWT
- Real-time: Socket.io

## Features
- User authentication (JWT)
- Boards, Lists, and Tasks
- Assign tasks to users
- Real-time task assignment updates using WebSockets

## Real-time Demo
When a task is assigned, all connected clients instantly receive an update without refresh.

## How to Run Locally

### Backend
```bash
cd server
npm install
npm run dev
