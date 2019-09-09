const express = require("express");
const router = express.Router();
const courseModel = require("../models/course");

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

  courseModel
    .find({ course_name: newCourse.course_name })
    .then(dbRes => {
      if (dbRes.length) {
        const msg = "Sorry, course already exists";
        res.render("course_add", { msg });
      } else {
        courseModel
          .create(newCourse)
          .then(dbRes => {
            const msg = "Course added to the database";
            res.render("manage_all", { msg });
          })
          .catch(err => console.log(err));
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
router.get("/course-edit/:id", (req, res) => {
  console.log(req.params.id);
  courseModel
    .findById(req.params.id)
    .then(dbRes => {
      console.log(dbRes);
      res.render("course_edit", { course: dbRes });
    })
    .catch(err => console.log(err));
});

module.exports = router;
