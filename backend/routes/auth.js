const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const checkUserSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserSql, [email], async (err, results) => {
      if (err) {
        console.error("❌ Error checking user existence:", err);
        return res.status(500).json({ message: "Database error. Please try again." });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Email already registered. Please log in." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user
      const insertUserSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(insertUserSql, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error("❌ Error inserting user:", err);
          return res.status(500).json({ message: "Registration failed. Try again later." });
        }
        res.json({ message: "✅ User registered successfully" });
      });
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("❌ Error fetching user:", err);
        return res.status(500).json({ message: "Database error. Try again." });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, "secret", { expiresIn: "1h" });

      res.json({ token, userId: user.id });
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
});

module.exports = router;
