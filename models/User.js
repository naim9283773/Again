const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  telegramId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  username: { type: String },
  photoUrl: { type: String },
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);