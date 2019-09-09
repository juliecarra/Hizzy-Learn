const express = require("express");
const router = express.Router();

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

module.exports = router;
