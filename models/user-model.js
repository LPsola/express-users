const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: [ "normal", "admin" ],
    default: "normal"
  },

  // normal sign up & login
  encryptedPassword: { type: String },

  // login with Google
  googleID: { type: String },

  // login with GitHub
  githubID: { type: String }
}, {
  timestamps: true
});

// define the "isAdmin" fake property
// CAN'T be an arrow function because it uses "this"
userSchema.virtual("isAdmin").get(function () {
  return this.role === "admin";
});

const User = mongoose.model("User", userSchema);

module.exports = User;
