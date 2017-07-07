const express        = require("express");
const authController = express.Router();

// User model
const User           = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

authController.get("/", (req, res, next) => {
  res.render("signup");
});

module.exports = authController;
