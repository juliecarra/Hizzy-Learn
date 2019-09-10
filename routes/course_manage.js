const express = require("express");
const router = express.Router();
const courseModel = require("../models/course");
const videoModel = require("../models/video");

// ADD COURSE
router.post("/course-add", (req, res) => {
  console.log("req body :", req.body);
  const { course_name, course_difficulty, course_videos } = req.body;
  const newCourse = {
    course_name,
    course_difficulty,
    course_videos
  };
  console.log("new object :", newCourse);

  function createNewCourse(course) {
    return courseModel
      .create(course)
      .then(dbRes => dbRes)
      .catch(err => err);
  }

  courseModel
    .find({ course_name: newCourse.course_name })
    .then(dbRes => {
      if (dbRes.length) {
        const msg = "Sorry, course already exists";
        res.render("course_add", { msg });
      } else {
        const course = createNewCourse(newCourse);
        res.redirect("/manage-all");
      }
    })
    .catch(err => console.log(err));
});

// DELETE COURSE
router.delete("/course-delete/:id", (req, res) => {
  console.log("YAY");
  console.log(req.params.id);
  courseModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => res.send(dbRes))
    .catch(err => console.log(err));
});

// EDIT COURSE
function findCourseById(id) {
  return courseModel
    .findById(id)
    .then(dbRes => dbRes)
    .catch(err => console.log(err));
}
function findAllVideos() {
  return videoModel
    .find()
    .then(dbRes => dbRes)
    .catch(err => console.log(err));
}

router.get("/course-edit/:id", (req, res) => {
  console.log(req.params.id);
  const course = findCourseById(req.params.id);
  const videos = findAllVideos();

  Promise.all([course, videos])
    .then(values => {
      console.log(values);
      res.render("course_edit", {
        course: values[0],
        videos: values[1]
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
