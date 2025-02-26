const express = require("express");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token.split(" ")[1], "secret", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.userId = decoded.id;
    next();
  });
};

// Create Group
router.post("/create", verifyToken, async (req, res) => {
  const { name } = req.body;

  try {
    await db("groups").insert({ name, owner_id: req.userId });
    res.json({ message: "Group created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating group", error: err.message });
  }
});

// Invite Member (Dummy API for now)
router.post("/:groupId/invite", verifyToken, (req, res) => {
  res.json({ message: `User invited to group ${req.params.groupId}` });
});

module.exports = router;
