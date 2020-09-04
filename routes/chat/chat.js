const express = require("express");
const router = express.Router();
const data = require("./data");
router.get("/", (req, res) => {
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
});
router.get("/", (req, res) => {
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
});
module.exports = router;
