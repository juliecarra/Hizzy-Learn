const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePhoto: { type: String, default: "" }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
