const express = require("express");
const router = express.Router();
const videoModel = require("../models/video");
const courseModel = require("../models/course");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/youttest", (req, res) => {
  res.render("yout_test");
});

// ADD ELEMENT TO COLLECTIONS ROUTES
router.get("/video-add", (req, res) => {
  res.render("video_add");
});
router.get("/course-add", (req, res) => {
  res.render("course_add");
});

function findAllVideos() {
  return videoModel
    .find()
    .then(dbRes => dbRes)
    .catch(err => console.log(err));
}
function findAllCourses() {
  return courseModel
    .find()
    .then(dbRes => dbRes)
    .catch(err => console.log(err));
}

router.get("/manage-all", ensureLoggedIn("/"), (req, res) => {
  const videos = findAllVideos();
  const courses = findAllCourses();
  Promise.all([videos, courses])
    .then(values => {
      // console.log(values);
      res.render("manage_all", {
        videos: values[0],
        courses: values[1],
        category: "HELLO THIS IS A CATEGORY"
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
