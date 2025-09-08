const express = require("express");
const router = express.Router();
const { getUser, createOrUpdateUser } = require("../controllers/userController");

// GET user profile
router.get("/", getUser);

// POST create or update user
router.post("/", createOrUpdateUser);

module.exports = router;
