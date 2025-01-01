const express = require('express');
const path = require('path');
const User = require('../models/User');
const connectDB = require('./db');

// MongoDB সংযোগ করুন
connectDB();

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Root route to display welcome page
app.get('/', (req, res) => {
  res.send('Welcome to Telegram WebApp API! Use /api/user to POST user data.');
});

// API to handle user data
app.post('/api/user', async (req, res) => {
  const { telegramId, firstName, lastName, username, photoUrl } = req.body;

  try {
    // Find or create user in database
    const user = await User.findOneAndUpdate(
      { telegramId },
      { telegramId, firstName, lastName, username, photoUrl },
      { new: true, upsert: true } // Create user if doesn't exist
    );

    // Render EJS page with user data
    res.render('user', { user });
  } catch (err) {
    console.error('Error handling user data:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the app
module.exports = app;