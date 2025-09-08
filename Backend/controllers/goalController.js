const Goal = require("../models/Goal");

// @desc Get all goals
// @route GET /api/goals
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Add a new goal
// @route POST /api/goals
const addGoal = async (req, res) => {
  try {
    const { title, targetAmount, deadline } = req.body;

    if (!title || !targetAmount) {
      return res.status(400).json({ message: "Title and targetAmount are required" });
    }

    const newGoal = new Goal({
      title,
      targetAmount,
      deadline,
    });

    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update a goal
// @route PUT /api/goals/:id
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    goal.title = req.body.title || goal.title;
    goal.targetAmount = req.body.targetAmount || goal.targetAmount;
    goal.currentAmount = req.body.currentAmount || goal.currentAmount;
    goal.deadline = req.body.deadline || goal.deadline;
    if (req.body.completed !== undefined) {
      goal.completed = req.body.completed;
    }

    const updatedGoal = await goal.save();
    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete a goal
// @route DELETE /api/goals/:id
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    await goal.deleteOne();
    res.json({ message: "Goal removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
};
