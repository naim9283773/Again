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

// Root route to display user data
app.get('/', async (req, res) => {
  try {
    // Example user data (Replace with actual Telegram user data)
    const telegramId = '12345678'; // Change this dynamically from request or testing
    const user = await User.findOne({ telegramId });

    // If no user found, show a message
    if (!user) {
      return res.send('No user found in the database. Please add a user first.');
    }

    // Render EJS template with user data
    res.render('user', { user });
  } catch (err) {
    console.error('Error fetching user data:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// API to handle user data and save in database
app.post('/api/user', async (req, res) => {
  const { telegramId, firstName, lastName, username, photoUrl } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { telegramId },
      { telegramId, firstName, lastName, username, photoUrl },
      { new: true, upsert: true } // Create user if doesn't exist
    );

    res.json({ message: 'User data saved successfully!', user });
  } catch (err) {
    console.error('Error saving user data:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the app
module.exports = app;