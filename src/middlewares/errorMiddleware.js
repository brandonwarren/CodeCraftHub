/**
 * src/middlewares/errorMiddleware.js
 * 
 * Centralized error handling middleware
 */
function errorHandler(err, req, res, next) {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error'
  });
}

module.exports = { errorHandler };

