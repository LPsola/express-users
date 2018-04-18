const passport = require("passport");

const User = require("../models/user-model");

// Run the code inside these files
require("./google-strategy");
require("./github-strategy");

// seralize: what information will we store in the session?
passport.serializeUser((userDetails, done) => {
  console.log("SERIALIZE (save to session)");
  // "null" in the 1st argument tells Passport "no errors occurred"
  done(null, userDetails._id);
});

// deseralize: how will we get the full user details?
passport.deserializeUser((idFromSession, done) => {
  console.log("deSERIALIZE (details from session)");
  User.findById(idFromSession)
    .then((userDetails) => {
      // "null" in the 1st argument tells Passport "no errors occurred"
      done(null, userDetails);
    })
    .catch((err) => {
      done(err);
    });
});

function passportSetup (app) {
  // add properties & methods to the "req" object in routes
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    // make "req.user" accessible inside hbs files as "blahUser"
    res.locals.blahUser = req.user;
    next();
  });
}

module.exports = passportSetup;
