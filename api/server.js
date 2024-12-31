const express = require('express');
const path = require('path');

const app = express();

// Static HTML ফাইল পরিবেশন করা
app.use(express.static(path.join(__dirname, '../public')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Export the app
module.exports = app;