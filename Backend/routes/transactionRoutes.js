const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const { transactionValidation } = require("../validators/transactionValidator");
const { validate } = require("../middleware/validateMiddleware");
const { protect } = require("../middleware/authMiddleware");

// GET all transactions
router.get("/", protect, getTransactions);

// POST a new transaction (with validation)
router.post("/", protect, transactionValidation, validate, addTransaction);

// DELETE a transaction by ID
router.delete("/:id", protect, deleteTransaction);

module.exports = router;
