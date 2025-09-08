const { body } = require("express-validator");

exports.transactionValidation = [
  body("type").isIn(["income", "expense"]).withMessage("Type must be income or expense"),
  body("amount").isNumeric().withMessage("Amount must be a number"),
  body("category").notEmpty().withMessage("Category is required"),
];
