// src/models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User schema defines the structure of user documents in MongoDB.
 * Passwords are stored as hashes.
 * Roles support multiple user types (e.g., student, instructor, admin).
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    roles: {
      type: [String],
      default: ['student']
    },
    profile: {
      name: { type: String, default: '' },
      bio: { type: String, default: '' }
      // Add additional profile fields as needed
    }
  },
  {
    timestamps: true
  }
);

/**
 * Compares a plain text password with the stored password hash.
 * @param {string} password - Plain text password
 * @returns {Promise<boolean>} - True if passwords match
 */
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

/**
 * Hashes the password before saving the user document.
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

