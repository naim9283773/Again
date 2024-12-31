const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('./db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// API to update balance
app.post('/api/click', async (req, res) => {
  const { telegramId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { telegramId },
      { $inc: { balance: 1 } },
      { new: true, upsert: true }
    );
    res.json({ balance: user.balance });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Export the app
module.exports = app;