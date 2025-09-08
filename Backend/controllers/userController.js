const User = require("../models/User");

// @desc Get user profile
// @route GET /api/user
const getUser = async (req, res) => {
  try {
    const user = await User.findOne(); // only one user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Create or update user profile
// @route POST /api/user
const createOrUpdateUser = async (req, res) => {
  try {
    const { name, email, currency } = req.body;

    let user = await User.findOne();
    if (user) {
      // update existing
      user.name = name || user.name;
      user.email = email || user.email;
      user.currency = currency || user.currency;
      const updatedUser = await user.save();
      return res.json(updatedUser);
    } else {
      // create new
      const newUser = new User({ name, email, currency });
      await newUser.save();
      return res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUser, createOrUpdateUser };
