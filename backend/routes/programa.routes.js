const express = require("express");
const router = express.Router();

const programa = require("../data/programa.data");

router.get("/", (req, res) => {
  res.json(programa);
});

module.exports = router;