const express = require("express");
const authController = express.Router();

// User model
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// Show the form
authController.get("/", (req, res, next) => {
  res.render("signup");
});

// info from the form
authController.post("/", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body);
  if (username === "" || password === "") {
    res.render("signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({ "username": username }, "username", (err, user) => {
    if (user !== null) {
      res.render("signup", {
        errorMessage: "The username already exists"
      });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      username: username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("signup", {
          errorMessage: "Something went wrong when signing up"
        });
      } else {
        // User has been created...now what?
        res.render("signup", {
          successMessage: "User created!!!!"
        });
      }
    });
  });
});

module.exports = authController;
