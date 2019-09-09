const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  name: String,
  url: { type: String, required: true },
  difficulty_tag: String,
  order_tag: Number
});

const videoModel = mongoose.model("videos", VideoSchema);

module.exports = videoModel;
