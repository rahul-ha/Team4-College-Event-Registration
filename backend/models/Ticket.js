// models/Ticket.js
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  name: String,
  email: String,
  phone: String,
  college: String,

  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },

  qrToken: String,
  qrTokenHash: String,

  used: { type: Boolean, default: false },
  checkedAt: Date,

  paymentStatus: { type: String, enum: ['paid', 'free'], default: 'free' },

  issuedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
