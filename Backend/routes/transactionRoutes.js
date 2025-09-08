const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const { transactionValidation } = require("../validators/transactionValidator");
const { validate } = require("../middleware/validateMiddleware");

// GET all transactions
router.get("/", getTransactions);

// POST a new transaction (with validation)
router.post("/", transactionValidation, validate, addTransaction);

// DELETE a transaction by ID
router.delete("/:id", deleteTransaction);

module.exports = router;
