const express = require("express");
const router = express.Router();
const videoModel = require("../models/video");
const courseModel = require("../models/course");
const userModel = require("../models/user");
const uploader = require("./../config/cloudinary");

router.post("/profile", uploader.single("profilePhoto"), (req, res) => {
  console.log("file ??? ->");
  //   console.log(req.file.secure_url);
  //   console.log(req.session.passport.user);
  const avatar = req.file.secure_url;
  const userId = req.session.passport.user;
  userModel
    .findByIdAndUpdate(userId, { profilePhoto: avatar })
    .then(dbRes => {
      console.log(dbRes);
      res.redirect("/profile");
    })
    .catch(dbErr => {
      console.log(dbErr);
      res.send("server crashed while uploading photo...");
    });
});

router.post("/course-list", (req, res) => {
  // console.log(req.data);
  // console.log(req.body);
  courseModel
    .find(req.body)
    .then(dbRes => {
      // console.log(dbRes);
      res.send(dbRes);
    })
    .catch(err => console.log(err));
});

router.post("/profile-course-update", (req, res) => {
  console.log(req.body);
  // console.log(req.user);
  userModel
    .findOneAndUpdate({ _id: req.user._id }, req.body)
    .then(dbRes => {
      // console.log(dbRes);
      const msg = { msg: "Course selected" };
      res.send(msg);
    })
    .catch(err => console.log(err));
});

module.exports = router;
