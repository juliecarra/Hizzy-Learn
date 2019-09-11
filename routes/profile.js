const express = require("express");
const router = new express.Router();
const videoModel = require("../models/video");
const courseModel = require("../models/course");
const userModel = require("../models/user");

router.patch("/profile/", (req, res) => {
  console.log(req.body);
  console.log(req.user);
  userModel
    .findOneAndUpdate({ _id: req.user._id })
    .then()
    .catch();
});

module.exports = router;
