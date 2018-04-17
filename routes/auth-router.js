const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user-model");

const router = express.Router();

router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup-form");
});

router.post("/process-signup", (req, res, next) => {
  const { fullName, email, password } = req.body;

  // password can't be blank and requires a number
  if (password === "" || password.match(/[0-9]/) === null) {
    res.redirect("/signup");
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync(password, salt);

  User.create({ fullName, email, encryptedPassword })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/login", (req, res, next) => {
  res.render("auth-views/login-form");
});

router.post("/process-login", (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((userDetails) => {
      // "userDetails" will be falsy if we didn't find a user
      if (!userDetails) {
        res.redirect("/login");
        return;
      }

      const { encryptedPassword } = userDetails;
      if (bcrypt.compareSync(password, encryptedPassword)) {
        res.send("<h1>CREDENTIALS ARE GOOD</h1>");
      }
      else {
        res.redirect("/login");
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
