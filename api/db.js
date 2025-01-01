const mongoose = require('mongoose');

// MongoDB URI সরাসরি কোডে সংযুক্ত
const MONGODB_URI =
  'mongodb+srv://test:test@cluster0.us30o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Failed:', err.message);
    process.exit(1); // Stop the app if DB connection fails
  }
};

module.exports = connectDB;