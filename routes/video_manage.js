const express = require("express");
const router = express.Router();
const videoModel = require("../models/video");

// ADD VIDEO
router.post("/video-add", (req, res) => {
  console.log("req body :", req.body);
  const { name, url, difficulty_tag, description } = req.body;
  console.log(url);
  req.body.front_end === "on" ? (front_end = true) : (front_end = false);
  req.body.back_end === "on" ? (back_end = true) : (back_end = false);
  const newVid = {
    name,
    url,
    difficulty_tag,
    description,
    front_end,
    back_end
  };
  console.log("new object :", newVid);

  videoModel
    .find({ url: newVid.url })
    .then(dbRes => {
      if (dbRes.length) {
        const msg = "Sorry, video already exists";
        res.render("video_add", { msg });
      } else {
        videoModel
          .create(newVid)
          .then(dbRes => {
            const msg = "Video added to the database";
            res.render("video_add", { msg });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
});

// DELETE VIDEO
router.delete("/video-delete/:id", (req, res) => {
  console.log("YAY");
  console.log(req.params.id);
  sneakerModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => res.send(dbRes))
    .catch(err => console.log(err));
});

module.exports = router;
