// src/validations/userValidation.js
const Joi = require('joi');

/**
 * Validation schema for user registration.
 * Password must be at least 6 characters.
 */
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().max(100).optional()
});

/**
 * Validation schema for user login.
 */
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = {
  registerSchema,
  loginSchema
};

