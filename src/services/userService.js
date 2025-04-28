// src/services/userService.js
const User = require('../models/userModel');

/**
 * Creates a new user in the database.
 * @param {Object} userData - Contains email, password, and optional profile info.
 * @returns {Promise<User>} Created user document
 * @throws {Error} If user with email already exists
 */
async function registerUser(userData) {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    const error = new Error('Email already registered');
    error.statusCode = 400;
    throw error;
  }

  // Create user with passwordHash set to password (will be hashed by pre-save hook)
  const user = new User({
    email: userData.email,
    passwordHash: userData.password,
    profile: {
      name: userData.name || ''
    }
  });

  await user.save();
  return user;
}

/**
 * Validates user credentials and returns user if valid.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>} Authenticated user
 * @throws {Error} If credentials are invalid
 */
async function authenticateUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  return user;
}

/**
 * Retrieves user profile by user ID.
 * @param {string} userId
 * @returns {Promise<User|null>} User document or null if not found
 */
async function getUserProfile(userId) {
  return User.findById(userId).select('-passwordHash');
}

module.exports = {
  registerUser,
  authenticateUser,
  getUserProfile
};

