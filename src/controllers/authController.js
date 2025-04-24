/**
 * src/controllers/authController.js
 * 
 * Controller functions for authentication
 */
const userService = require('../services/userService');
const { generateToken } = require('../utils/jwtUtils');

/**
 * Register a new user
 */
async function registerUser(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Login a user and return JWT token
 */
async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ id: user._id, role: user.role });
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

module.exports = { registerUser, loginUser };

