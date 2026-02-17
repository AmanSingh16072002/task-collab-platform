import express from "express";
import List from "../models/List.js";
import Board from "../models/Board.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Create list inside a board
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, boardId } = req.body;

    // Ensure board exists & user is member
    const board = await Board.findById(boardId);
    if (!board || !board.members.includes(req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const list = await List.create({
      title,
      board: boardId,
    });

    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get lists of a board
router.get("/:boardId", authMiddleware, async (req, res) => {
  try {
    const lists = await List.find({
      board: req.params.boardId,
    }).sort("position");

    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
