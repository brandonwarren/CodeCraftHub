// src/middlewares/errorMiddleware.js
/**
 * Express error-handling middleware.
 * Sends JSON error responses with appropriate HTTP status codes.
 */
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error'
  });
}

module.exports = errorHandler;

