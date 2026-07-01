const express = require("express");
const router = express.Router();
const { auth } = require("../server");

const noticies = require("../data/noticies.data");

// GET
router.get("/", (req, res) => {
  res.json(noticies);
});

// POST
router.post("/", (req, res) => {
  const nova = {
    id: noticies.length + 1,
    titol: req.body.titol,
    contingut: req.body.contingut,
    data: new Date()
  };

  noticies.push(nova);
  res.json(nova);
});

module.exports = router;