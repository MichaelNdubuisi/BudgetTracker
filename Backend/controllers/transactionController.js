const Transaction = require("../models/Transaction");

// @desc Get all transactions for the logged-in user
// @route GET /api/transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Add a transaction
// @route POST /api/transactions
const addTransaction = async (req, res) => {
  try {
    const { type, category, amount } = req.body;

    if (!type || !category || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTransaction = new Transaction({
      user: req.user._id,
      type,
      category,
      amount,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete a transaction
// @route DELETE /api/transactions/:id
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check if transaction belongs to user
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};
