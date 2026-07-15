// ==============================================
// controllers/historyController.js
// ==============================================
// Handles the user's learning activity history -
// used by the History page in React.
// Dummy data for now; MongoDB comes later.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

// ----------------------------------------------
// @desc    Get the activity history of the logged-in user
// @route   GET /api/history
// @access  Private
// ----------------------------------------------
export const getHistory = asyncHandler(async (req, res) => {
  const dummyHistory = [
    {
      id: "hist_1",
      action: "completed_quiz",
      description: "Completed 'JavaScript Basics Quiz' with 80%",
      timestamp: "2026-07-14T15:30:00.000Z",
    },
    {
      id: "hist_2",
      action: "created_note",
      description: "Created note 'React useState'",
      timestamp: "2026-07-12T11:00:00.000Z",
    },
    {
      id: "hist_3",
      action: "started_learning",
      description: "Started learning 'React Fundamentals'",
      timestamp: "2026-07-05T09:00:00.000Z",
    },
  ];

  return sendSuccess(res, 200, "History fetched", dummyHistory);
});

// ----------------------------------------------
// @desc    Delete one history entry
// @route   DELETE /api/history/:id
// @access  Private
// ----------------------------------------------
export const deleteHistoryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  return sendSuccess(res, 200, `History item ${id} deleted`, null);
});

// ----------------------------------------------
// @desc    Clear the entire history
// @route   DELETE /api/history
// @access  Private
// ----------------------------------------------
export const clearHistory = asyncHandler(async (req, res) => {
  return sendSuccess(res, 200, "History cleared", null);
});
