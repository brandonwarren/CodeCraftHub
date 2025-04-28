// src/config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Connects to MongoDB using the connection string from environment variables.
 * Handles connection success and error events.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

