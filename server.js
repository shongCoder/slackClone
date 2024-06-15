const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "174101",
  database: "slackDB",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

app.get("/", (req, res) => {
  res.send("Hello, this is the root endpoint!");
});

// 사용자 추가 엔드포인트
app.post("/addUser", (req, res) => {
  const { name, profile } = req.body;
  const sql = "INSERT INTO user (name, profile) VALUES (?, ?)";
  db.query(sql, [name, profile], (err, result) => {
    if (err) {
      console.error("Error adding user:", err);
      res.status(500).send(err);
    } else {
      res.status(200).send("User added successfully");
    }
  });
});

// 메시지 추가 엔드포인트
app.post("/addMessage", (req, res) => {
  const { id, text, name, time } = req.body;
  const sql = "INSERT INTO messages (id, text, name, time) VALUES (?, ?, ?, ?)";
  console.log(`Attempting to add message: ${id}, ${text}, ${name}, ${time}`);
  db.query(sql, [id, text, name, time], (err, result) => {
    if (err) {
      console.error("Error adding message:", err);
      res.status(500).send(err);
    } else {
      res.status(200).send("Message added successfully");
    }
  });
});

// 메시지 삭제 엔드포인트
app.delete("/delMessage/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM messages WHERE id = ?";
  console.log(`Attempting to delete message with id: ${id}`);
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting message:", err);
      res.status(500).send(err);
    } else {
      res.status(200).send("Message deleted successfully");
    }
  });
});

// 메시지 수정 엔드포인트
app.put("/editMessage/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const sql = "UPDATE messages SET text = ? WHERE id = ?";
  console.log(`Attempting to edit message with id: ${id}`);
  db.query(sql, [text, id], (err, result) => {
    if (err) {
      console.error("Error editing message:", err);
      res.status(500).send(err);
    } else {
      res.status(200).send("Message edited successfully");
    }
  });
});

// 메시지 가져오기 엔드포인트
app.get("/getMessages", (req, res) => {
  const sql =
    "SELECT id, text, user.name, time, profile FROM messages JOIN user ON messages.name = user.name";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching messages:", err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
