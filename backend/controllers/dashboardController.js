// ==============================================
// controllers/dashboardController.js
// ==============================================
// Provides all the data shown on the Dashboard page in React:
// stats cards, recent activity, recent notes and quick stats.
// Dummy data for now; MongoDB comes later.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

// ----------------------------------------------
// @desc    Get the stats shown on the dashboard cards
// @route   GET /api/dashboard/stats
// @access  Private
// ----------------------------------------------
export const getStats = asyncHandler(async (req, res) => {
  const dummyStats = {
    topicsLearned: 12,
    quizzesTaken: 8,
    notesCreated: 24,
    flashcardsMastered: 45,
    currentStreak: 5, // days in a row
    totalStudyMinutes: 1240,
  };

  return sendSuccess(res, 200, "Dashboard stats fetched", dummyStats);
});

// ----------------------------------------------
// @desc    Get recent activity for the dashboard widget
// @route   GET /api/dashboard/recent-activity
// @access  Private
// ----------------------------------------------
export const getRecentActivity = asyncHandler(async (req, res) => {
  const dummyActivity = [
    {
      id: "act_1",
      action: "completed_quiz",
      description: "Completed 'JavaScript Basics Quiz'",
      timestamp: "2026-07-14T15:30:00.000Z",
    },
    {
      id: "act_2",
      action: "created_note",
      description: "Created note 'React useState'",
      timestamp: "2026-07-12T11:00:00.000Z",
    },
  ];

  return sendSuccess(res, 200, "Recent activity fetched", dummyActivity);
});

// ----------------------------------------------
// @desc    Get recent notes for the dashboard widget
// @route   GET /api/dashboard/recent-notes
// @access  Private
// ----------------------------------------------
export const getRecentNotes = asyncHandler(async (req, res) => {
  const dummyNotes = [
    {
      id: "note_2",
      title: "React useState",
      preview: "useState lets a component remember values...",
      createdAt: "2026-07-12T10:00:00.000Z",
    },
    {
      id: "note_1",
      title: "JS Closures",
      preview: "A closure is a function that remembers...",
      createdAt: "2026-07-10T10:00:00.000Z",
    },
  ];

  return sendSuccess(res, 200, "Recent notes fetched", dummyNotes);
});
