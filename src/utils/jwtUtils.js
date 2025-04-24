/**
 * src/utils/jwtUtils.js
 * 
 * JWT token generation utility
 */
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = '1h';

/**
 * Generate JWT token
 * @param {Object} payload
 * @returns {string}
 */
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

module.exports = { generateToken };

