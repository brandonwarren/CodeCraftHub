/**
 * src/routes/userRoutes.js
 * 
 * User related routes (example: get user profile)
 */
const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected route to get user profile
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;

