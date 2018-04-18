const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../models/user-model");

passport.use(new GoogleStrategy({
  clientID: process.env.google_id,
  clientSecret: process.env.google_secret,
  callbackURL: "/google/success",
  proxy: true
}, (accessToken, refreshToken, profile, done) => {
  console.log("GOOGLE profile --------------");
  console.log(profile);

  const { id, displayName, emails } = profile;

  User.findOne({ googleID: id })
    .then((userDetails) => {
      if (userDetails) {
        // if the user exists log them in
        done(null, userDetails);
        return;
      }

      // otherwise create a new user in the database
      return User.create({
          googleID: id,
          fullName: displayName,
          email: emails[0].value
        });
    })
    .then((newUser) => {
      // log in the newly created user
      done(null, newUser);
    })
    .catch((err) => {
      done(err);
    });
}));
