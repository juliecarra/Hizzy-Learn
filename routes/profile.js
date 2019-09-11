const express = require("express");
const router = new express.Router();
const videoModel = require("../models/video");
const courseModel = require("../models/course");
const userModel = require("../models/user");

/*
router.patch("/profile/", (req, res) => {
  console.log(req.body);
  console.log(req.user);
  userModel
    .findOneAndUpdate({ _id: req.user._id })
    .then()
    .catch();
*/

//DONE BY ME
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

module.exports = router;
