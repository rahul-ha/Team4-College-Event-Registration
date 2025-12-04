// models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  capacity: Number,
  seatsLeft: Number,
  startDate: Date,
  endDate: Date
});

EventSchema.pre("save", function (next) {
  if (this.isNew && this.capacity) this.seatsLeft = this.capacity;
  next();
});

module.exports = mongoose.model('Event', EventSchema);
