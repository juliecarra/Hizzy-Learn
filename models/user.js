const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePhoto: {
    type: String,
    default:
      "https://banner2.kisspng.com/20180722/gfc/kisspng-user-profile-2018-in-sight-user-conference-expo-5b554c0968c377.0307553315323166814291.jpg"
  },
  isAdmin: { type: Boolean, default: false },
  level: String,
  course: String,
  viewed_videos: [{ type: Schema.Types.ObjectId, ref: "Videos" }]
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
