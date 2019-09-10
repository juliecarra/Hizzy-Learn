const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePhoto: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },
  level: String,
  viewed_videos: Array
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
