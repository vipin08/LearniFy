// ==============================================
// controllers/userController.js
// ==============================================
// Handles the user's profile and settings
// (used by the Profile page and Settings page in React).
//
// All routes here are protected - the user must be logged in,
// so req.user is always the full user document (loaded by the
// protect middleware).

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";

const EMAIL_REGEX = /^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)+$/;
const STRONG_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

// Small helper: the safe, public shape of a user (never the password)
const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  stars: user.stars,
  createdAt: user.createdAt,
});

// ----------------------------------------------
// @desc    Get the logged-in user's profile
// @route   GET /api/users/profile
// @access  Private
// ----------------------------------------------
export const getProfile = asyncHandler(async (req, res) => {
  return sendSuccess(res, 200, "Profile fetched successfully", {
    user: publicUser(req.user),
  });
});

// ----------------------------------------------
// @desc    Update the logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private
// ----------------------------------------------
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, avatar } = req.body;
  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // If the email is being changed, make sure no one else already uses it
  if (cleanEmail && cleanEmail !== user.email) {
    if (!EMAIL_REGEX.test(cleanEmail)) {
      throw new ApiError(
        400,
        "Email can only use letters and numbers, with @ as the separator"
      );
    }

    const emailTaken = await User.findOne({ email: cleanEmail });
    if (emailTaken) {
      throw new ApiError(400, "Email is already in use");
    }
    user.email = cleanEmail;
  }

  if (cleanName) user.name = cleanName;
  if (avatar) user.avatar = avatar;

  await user.save();

  return sendSuccess(res, 200, "Profile updated successfully", {
    user: publicUser(user),
  });
});

// ----------------------------------------------
// @desc    Change the user's password
// @route   PUT /api/users/change-password
// @access  Private
// ----------------------------------------------
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!newPassword || !STRONG_PASSWORD_REGEX.test(newPassword)) {
    throw new ApiError(
      400,
      "New password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 special character"
    );
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    throw new ApiError(401, "Old password is incorrect");
  }

  // The pre-save hook in the User model hashes it automatically
  user.password = newPassword;
  await user.save();

  return sendSuccess(res, 200, "Password changed successfully", null);
});

// ----------------------------------------------
// @desc    Get the user's app settings
// @route   GET /api/users/settings
// @access  Private
// ----------------------------------------------
export const getSettings = asyncHandler(async (req, res) => {
  // Settings are not stored in MongoDB yet - defaults for now
  const defaultSettings = {
    theme: "light",
    emailNotifications: true,
    studyReminders: true,
    language: "en",
  };

  return sendSuccess(res, 200, "Settings fetched successfully", defaultSettings);
});

// ----------------------------------------------
// @desc    Update the user's app settings
// @route   PUT /api/users/settings
// @access  Private
// ----------------------------------------------
export const updateSettings = asyncHandler(async (req, res) => {
  // req.body contains whichever settings the user changed
  const updatedSettings = {
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "Settings updated successfully", updatedSettings);
});

// ----------------------------------------------
// @desc    Delete the user's account
// @route   DELETE /api/users/account
// @access  Private
// ----------------------------------------------
export const deleteAccount = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);

  return sendSuccess(res, 200, "Account deleted successfully", null);
});
