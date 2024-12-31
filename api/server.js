const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('./db');

// MongoDB সংযোগ করুন
connectDB();

const app = express();
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// API to get or create user data
app.post('/api/user', async (req, res) => {
  const { telegramId, firstName, lastName, username, photoUrl } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { telegramId },
      { firstName, lastName, username, photoUrl },
      { new: true, upsert: true } // Create new user if not exists
    );
    res.json(user);
  } catch (err) {
    console.error('Error fetching/creating user:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to update balance
app.post('/api/click', async (req, res) => {
  const { telegramId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { telegramId },
      { $inc: { balance: 1 } },
      { new: true }
    );
    res.json({ balance: user.balance });
  } catch (err) {
    console.error('Error updating balance:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Export the app
module.exports = app;