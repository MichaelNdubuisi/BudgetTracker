const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    currency: { type: String, default: "NGN" }, // Default to Nigerian Naira
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
