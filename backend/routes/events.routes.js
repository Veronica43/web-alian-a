const express = require("express");
const router = express.Router();

const events = require("../data/events.data");

// GET
router.get("/", (req, res) => {
  res.json(events);
});

// POST
router.post("/", (req, res) => {
  const nou = {
    id: events.length + 1,
    titol: req.body.titol,
    descripcio: req.body.descripcio,
    data: req.body.data,
    lloc: req.body.lloc
  };

  events.push(nou);
  res.json(nou);
});

module.exports = router;