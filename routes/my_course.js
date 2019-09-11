const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const videoModel = require("../models/video");
const courseModel = require("../models/course");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.patch("/my_course", (req, res) => {
  console.log(req.body);
  console.log(req.user);
  userModel
    .findOneAndUpdate(
      { _id: req.user._id },
      { $push: { viewed_videos: req.body.videoId } }
    )
    .then(dbRes => dbRes)
    .catch(err => console.log(err));
});

function findUserVideos(array) {
  return videoModel
    .find({ _id: array })
    .then(dbRes => dbRes)
    .catch(err => console.log(err));
}
function findCourse(req) {
  return courseModel
    .find({ course_difficulty: req.user.level, course_cursus: req.user.cursus })
    .populate("course_videos")
    .then(dbRes => dbRes)
    .catch(err => console.log(err));
}

router.get("/my-course", ensureLoggedIn("/"), (req, res) => {
  const userViewedVideos = findUserVideos(req.user.viewed_videos);
  const course = findCourse(req);
  Promise.all([userViewedVideos, course])
    .then(values => {
      const viewed = values[0];
      const course = values[1];
      const courseVideos = course[0].course_videos;
      for (let i = 0; i < viewed.length; i++) {
        for (let j = courseVideos.length - 1; j >= 0; j--) {
          if (courseVideos[j]._id.equals(viewed[i]._id)) {
            courseVideos.splice(j, 1);
          }
        }
      }
      console.log("Course videos", courseVideos);
      res.render("my_course", {
        viewedVideos: viewed,
        courseVideos: courseVideos
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
