/**
 * src/services/userService.js
 * 
 * Business logic and DB operations related to users
 */
const User = require('../models/userModel');

/**
 * Create a new user
 * @param {Object} userData
 * @returns {Promise<User>}
 */
async function createUser(userData) {
  // Additional validations can be added here
  const user = new User(userData);
  return user.save();
}

/**
 * Find user by email
 * @param {string} email
 * @returns {Promise<User|null>}
 */
async function findUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Find user by ID
 * @param {string} id
 * @returns {Promise<User|null>}
 */
async function findUserById(id) {
  return User.findById(id);
}

module.exports = { createUser, findUserByEmail, findUserById };

