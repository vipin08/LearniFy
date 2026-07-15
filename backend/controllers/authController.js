// ==============================================
// controllers/authController.js
// ==============================================
// Handles everything about authentication:
// register, login, logout, forgot password, reset password.
//
// NOTE: MongoDB is NOT connected yet, so these functions
// return dummy (fake) data. The route structure, status codes
// and response shape are final - later we only swap the dummy
// data with real database queries.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

// ----------------------------------------------
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
// ----------------------------------------------
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists in MongoDB
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, "User with this email already exists");
  }

  // Create user (hashing password happens in the pre-save hook)
  const user = await User.create({
    name,
    email,
    password,
  });

  // Create a JWT token for the new user
  const token = generateToken(user._id);

  // 201 = Created
  return sendSuccess(res, 201, "User registered successfully", {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      stars: user.stars,
      createdAt: user.createdAt,
    },
    token: token,
  });
});

// ----------------------------------------------
// @desc    Login an existing user
// @route   POST /api/auth/login
// @access  Public
// ----------------------------------------------
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user in MongoDB
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Compare passwords
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id);

  return sendSuccess(res, 200, "Login successful", {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      stars: user.stars,
    },
    token: token,
  });
});

// ----------------------------------------------
// @desc    Logout the current user
// @route   POST /api/auth/logout
// @access  Private (needs token)
// ----------------------------------------------
export const logoutUser = asyncHandler(async (req, res) => {
  return sendSuccess(res, 200, "Logout successful", null);
});

// ----------------------------------------------
// @desc    Send a password reset link to the user's email
// @route   POST /api/auth/forgot-password
// @access  Public
// ----------------------------------------------
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  return sendSuccess(res, 200, `Password reset link sent to ${email}`, {
    resetToken: "dummy_reset_token_123",
  });
});

// ----------------------------------------------
// @desc    Reset password using the token from the email
// @route   POST /api/auth/reset-password/:token
// @access  Public
// ----------------------------------------------
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  return sendSuccess(res, 200, "Password has been reset successfully", {
    tokenUsed: token,
  });
});

// ----------------------------------------------
// @desc    Get the currently logged-in user (from token)
// @route   GET /api/auth/me (also /api/auth/profile)
// @access  Private (needs token)
// ----------------------------------------------
export const getMe = asyncHandler(async (req, res) => {
  // req.user was set by the "protect" middleware and already loaded from DB
  return sendSuccess(res, 200, "Current user fetched", {
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      stars: req.user.stars,
    },
  });
});
