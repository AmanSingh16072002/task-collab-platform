import express from "express";
import Board from "../models/Board.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Create board
router.post("/", authMiddleware, async (req, res) => {
  try {
    const board = await Board.create({
      title: req.body.title,
      createdBy: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get my boards
router.get("/", authMiddleware, async (req, res) => {
  try {
    const boards = await Board.find({
      members: req.user.id,
    });

    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
