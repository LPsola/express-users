const express = require("express");

const User = require("../models/user-model");

const router = express.Router();

router.get("/admin/users", (req, res, next) => {
  // if you aren't logged in or you are NOT an admin
  if (!req.user || req.user.role !== "admin") {
    // ... go straight to the 404 page (sneaky!)
    next();
    return;
  }

  User.find()
    .then((usersFromDb) => {
      res.locals.userList = usersFromDb;
      res.render("admin-views/user-list-page");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
