// routes/events.js
const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { requireAuth } = require("../middleware/auth");

// Create an event (ADMIN ONLY)
router.post("/create", requireAuth(["admin"]), async (req, res) => {
  try {
    const { name, description, price, capacity } = req.body;

    if (!name || !capacity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newEvent = await Event.create({
      name,
      description,
      price,
      capacity,
      seatsLeft: capacity,
    });

    res.json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single event details (PUBLIC)
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
