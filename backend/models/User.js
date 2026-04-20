const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

console.log("User model loaded");

// ✅ FIX: prevent model overwrite issue
module.exports = mongoose.models.User || mongoose.model("User", userSchema);