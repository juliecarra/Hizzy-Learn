const express = require("express");
const router = express.Router();
const videoModel = require("../models/video");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/youttest", (req, res) => {
  res.render("yout_test");
});

router.get("/video-add", (req, res) => {
  res.render("video_add");
});

router.get("/video-manage", (req, res) => {
  videoModel
    .find()
    .then(dbRes =>
      res.render("video_manage", {
        videos: dbRes,
        scripts: ["manage.js"]
      })
    )
    .catch(err => console.log(err));
});
module.exports = router;
