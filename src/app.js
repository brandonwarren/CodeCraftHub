/**
 * src/app.js
 * 
 * Express app setup with middleware and routes
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Security HTTP headers
app.use(helmet());
// Enable CORS
app.use(cors());
// Parse JSON request bodies
app.use(express.json());
// HTTP request logging
app.use(morgan('combined'));

// Route registrations
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Centralized error handling middleware
app.use(errorHandler);

module.exports = app;

