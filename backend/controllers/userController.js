// ==============================================
// controllers/userController.js
// ==============================================
// Handles the user's profile and settings
// (used by the Profile page and Settings page in React).
//
// All routes here are protected - the user must be logged in.
// Dummy data for now; MongoDB comes later.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

// ----------------------------------------------
// @desc    Get the logged-in user's profile
// @route   GET /api/users/profile
// @access  Private
// ----------------------------------------------
export const getProfile = asyncHandler(async (req, res) => {
  const dummyProfile = {
    id: req.user.id,
    name: "Demo User",
    email: "demo@example.com",
    avatar: null,
    bio: "Learning something new every day!",
    joinedAt: "2026-01-15T10:00:00.000Z",
    stats: {
      topicsLearned: 12,
      quizzesTaken: 8,
      notesCreated: 24,
      currentStreak: 5,
    },
  };

  return sendSuccess(res, 200, "Profile fetched successfully", dummyProfile);
});

// ----------------------------------------------
// @desc    Update the logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private
// ----------------------------------------------
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, bio } = req.body;

  // LATER: update the user document in MongoDB

  const updatedProfile = {
    id: req.user.id,
    name: name || "Demo User",
    bio: bio || "",
    updatedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "Profile updated successfully", updatedProfile);
});

// ----------------------------------------------
// @desc    Change the user's password
// @route   PUT /api/users/change-password
// @access  Private
// ----------------------------------------------
export const changePassword = asyncHandler(async (req, res) => {
  // LATER: verify old password hash, save new password hash

  return sendSuccess(res, 200, "Password changed successfully", null);
});

// ----------------------------------------------
// @desc    Get the user's app settings
// @route   GET /api/users/settings
// @access  Private
// ----------------------------------------------
export const getSettings = asyncHandler(async (req, res) => {
  const dummySettings = {
    theme: "light",
    emailNotifications: true,
    studyReminders: true,
    language: "en",
  };

  return sendSuccess(res, 200, "Settings fetched successfully", dummySettings);
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
  // LATER: delete the user and all their data from MongoDB

  return sendSuccess(res, 200, "Account deleted successfully", null);
});
