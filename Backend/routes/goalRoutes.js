const express = require("express");
const router = express.Router();
const {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// GET all goals
router.get("/", getGoals);

// POST a new goal
router.post("/", addGoal);

// PUT update a goal
router.put("/:id", updateGoal);

// DELETE a goal
router.delete("/:id", deleteGoal);

module.exports = router;
