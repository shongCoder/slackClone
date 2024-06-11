const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "174101",
  database: "mydatabase",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

app.get("/messages", (req, res) => {
  db.query("SELECT * FROM messages", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post("/messages", (req, res) => {
  const { text, name, profile, time } = req.body;
  db.query(
    "INSERT INTO messages (text, name, profile, time) VALUES (?, ?, ?, ?)",
    [text, name, profile, time],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ id: results.insertId });
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
