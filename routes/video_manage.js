const express = require("express");
const router = express.Router();

router.post("/video-add", (req, res) => {
  console.log(req.body);
});

module.exports = router;
