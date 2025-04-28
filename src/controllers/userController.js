// src/controllers/userController.js
const userService = require('../services/userService');
const tokenUtils = require('../utils/tokenUtils');
const { registerSchema, loginSchema } = require('../validations/userValidation');

/**
 * Handles user registration.
 * Validates input, creates user, and returns JWT token.
 */
async function register(req, res, next) {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await userService.registerUser(value);
    const token = tokenUtils.generateToken({ id: user._id, email: user.email, roles: user.roles });

    res.status(201).json({
      message: 'User registered successfully',
      token
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Handles user login.
 * Validates credentials and returns JWT token.
 */
async function login(req, res, next) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await userService.authenticateUser(value.email, value.password);
    const token = tokenUtils.generateToken({ id: user._id, email: user.email, roles: user.roles });

    res.json({
      message: 'Login successful',
      token
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Returns the profile of the authenticated user.
 */
async function getProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await userService.getUserProfile(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      email: user.email,
      roles: user.roles,
      profile: user.profile,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  getProfile
};

