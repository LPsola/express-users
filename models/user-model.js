const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  // normal sign up & login
  encryptedPassword: { type: String },

  // login with Google
  googleID: { type: String },

  // login with GitHub
  githubID: { type: String }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
