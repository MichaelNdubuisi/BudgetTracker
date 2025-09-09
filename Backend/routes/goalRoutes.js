const express = require("express");
const router = express.Router();
const {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

// GET all goals
router.get("/", protect, getGoals);

// POST a new goal
router.post("/", protect, addGoal);

// PUT update a goal
router.put("/:id", protect, updateGoal);

// DELETE a goal
router.delete("/:id", protect, deleteGoal);

module.exports = router;
