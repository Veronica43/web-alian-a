const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());
const SECRET = "clau_super_secreta";

// rutes
const noticiesRoutes = require("./routes/noticies.routes");
const eventsRoutes = require("./routes/events.routes");
const programaRoutes = require("./routes/programa.routes");

app.post("/login", (req, res) => {
  const { user, pass } = req.body;

  if (user === "admin" && pass === "1234") {
    const token = jwt.sign({ user }, SECRET, { expiresIn: "2h" });
    return res.json({ ok: true, token });
  }

  return res.status(401).json({ ok: false });
});
function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) return res.status(401).send("No token");

  const token = header.split(" ")[1];

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).send("Token invàlid");
  }
}
app.listen(3000, () => {
  console.log("Servidor en port 3000");
});

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