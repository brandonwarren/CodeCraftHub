/**
 * src/controllers/userController.js
 * 
 * Controller functions for user-related operations
 */
const userService = require('../services/userService');

/**
 * Get logged in user profile
 */
async function getUserProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return user profile without password
    const { password, ...userData } = user.toObject();
    res.json(userData);
  } catch (error) {
    next(error);
  }
}

module.exports = { getUserProfile };

