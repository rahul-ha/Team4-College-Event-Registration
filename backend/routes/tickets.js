// routes/tickets.js
const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const router = express.Router();

const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const { requireAuth } = require("../middleware/auth");
const { generateQrDataUrl } = require("../utils/qr");

// Register a ticket (USER)
router.post("/register", requireAuth(["user", "admin", "volunteer"]), async (req, res) => {
  try {
    const { name, email, phone, college, eventId } = req.body;

    if (!eventId) return res.status(400).json({ error: "No event selected" });

    const ev = await Event.findById(eventId);
    if (!ev) return res.status(404).json({ error: "Event not found" });

    if (ev.capacity && ev.seatsLeft <= 0) {
      return res.status(400).json({ error: "Event is full" });
    }

    const paymentStatus = ev.price > 0 ? "paid" : "free";

    const ticket = await Ticket.create({
      user: req.user.id,   // from JWT
      name,
      email,
      phone,
      college,
      event: ev._id,
      paymentStatus,
      qrToken: "temp",
    });

    // Create QR token
    const tokenPayload = {
      ticketId: ticket._id.toString(),
      eventId: ev._id.toString(),
      issuedAt: Date.now(),
    };

    const token = jwt.sign(tokenPayload, process.env.QR_SECRET, { expiresIn: "30d" });
    const hash = crypto.createHash("sha256").update(token).digest("hex");

    ticket.qrToken = token;
    ticket.qrTokenHash = hash;
    await ticket.save();

    // Reduce seat count
    if (ev.capacity) {
      ev.seatsLeft = ev.seatsLeft - 1;
      await ev.save();
    }

    const qrDataUrl = await generateQrDataUrl(token);

    res.json({ success: true, ticket, qrDataUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Scan / Verify ticket (VOLUNTEER + ADMIN)
router.post("/verify", requireAuth(["volunteer", "admin"]), async (req, res) => {
  try {
    const { token } = req.body;

    const payload = jwt.verify(token, process.env.QR_SECRET);
    const ticketId = payload.ticketId;

    const updatedTicket = await Ticket.findOneAndUpdate(
      { _id: ticketId, used: false },
      { used: true, checkedAt: Date.now() },
      { new: true }
    );

    if (!updatedTicket) {
      return res.json({ status: "duplicate", message: "Ticket already used!" });
    }

    res.json({ status: "ok", ticket: updatedTicket });
  } catch (err) {
    res.json({ status: "invalid", error: err.message });
  }
});

// Manual fallback search by phone (ADMIN + VOLUNTEER)
router.get("/search/phone/:phone", requireAuth(["admin", "volunteer"]), async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ phone: req.params.phone }).populate("event");
    if (!ticket) return res.status(404).json({ error: "No ticket found" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tickets of a user (USER)
router.get("/user/:userId", requireAuth(["user", "admin", "volunteer"]), async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.params.userId }).populate("event");
    res.json({ tickets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin-only: list all tickets
router.get("/all", requireAuth(["admin"]), async (req, res) => {
  try {
    const list = await Ticket.find().populate("event user");
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
