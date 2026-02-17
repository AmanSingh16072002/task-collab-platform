import mongoose from "mongoose";
import express from "express";
import Task from "../models/Task.js";
import List from "../models/List.js";
import Board from "../models/Board.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { io } from "../index.js";


const router = express.Router();

// Create task inside a list
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, listId } = req.body;

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Ensure user is member of the board
    const board = await Board.findById(list.board);
    if (!board.members.includes(req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const task = await Task.create({
      title,
      description,
      list: listId,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get tasks of a list
router.get("/:listId", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      list: req.params.listId,
    }).sort("position");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Assign user to task
router.patch("/:taskId/assign", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.assignedTo = new mongoose.Types.ObjectId(userId);
    await task.save();

    /* 🔥 EMIT REAL-TIME EVENT */
    io.emit("task-assigned", {
      taskId: task._id,
      taskTitle: task.title,
      assignedTo: userId,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
