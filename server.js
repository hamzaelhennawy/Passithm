const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = "./users.json";

app.use(cors());
app.use(bodyParser.json());

// Helper: Read users from JSON file
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}

// Helper: Save users to JSON file
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// POST /signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const users = readUsers();

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Email already registered." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashedPassword });
    saveUsers(users);
    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// POST /login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(400).json({ message: "Invalid email or password." });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
