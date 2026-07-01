const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// rutes
const noticiesRoutes = require("./routes/noticies.routes");
const eventsRoutes = require("./routes/events.routes");
const programaRoutes = require("./routes/programa.routes");

app.use("/noticies", noticiesRoutes);
app.use("/events", eventsRoutes);
app.use("/programa", programaRoutes);

// prova
app.get("/", (req, res) => {
  res.send("Backend funcionant 🚀");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor en port " + PORT);
});