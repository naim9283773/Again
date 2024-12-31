const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  telegramId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  username: { type: String, required: false },
  photoUrl: { type: String, required: false },
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);