// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['admin', 'volunteer', 'user'], default: 'user' }
});

UserSchema.methods.verifyPassword = function (pass) {
  return bcrypt.compare(pass, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);
