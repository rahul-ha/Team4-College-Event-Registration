// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middleware/auth");


// LOGIN (ADMIN + USER + VOLUNTEER)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Admin login using .env credentials
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { id: "admin", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        _id: "admin",
        name: "System Admin",
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
    });
  }

  // Normal user login
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid Email or Password" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid Email or Password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user });
});

// USER REGISTRATION
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      role: "user"
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Volunteer (ADMIN ONLY)
router.post("/create-volunteer", requireAuth(["admin"]), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const volunteer = await User.create({
      name,
      email,
      passwordHash: hash,
      role: "volunteer",
    });

    res.json(volunteer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
