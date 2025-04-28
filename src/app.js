// src/app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/users', userRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

module.exports = app;

