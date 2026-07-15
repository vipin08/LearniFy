// ==============================================
// controllers/summaryController.js
// ==============================================
// Handles AI-generated summaries of learning topics.
// Dummy data for now; MongoDB + Gemini come later.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

// ----------------------------------------------
// @desc    Get all summaries of the logged-in user
// @route   GET /api/summaries
// @access  Private
// ----------------------------------------------
export const getAllSummaries = asyncHandler(async (req, res) => {
  const dummySummaries = [
    {
      id: "sum_1",
      topicId: "learn_1",
      title: "JavaScript Basics - Summary",
      preview: "JavaScript is a programming language for the web...",
      createdAt: "2026-07-02T10:00:00.000Z",
    },
  ];

  return sendSuccess(res, 200, "Summaries fetched", dummySummaries);
});

// ----------------------------------------------
// @desc    Get one summary by its id
// @route   GET /api/summaries/:id
// @access  Private
// ----------------------------------------------
export const getSummaryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const dummySummary = {
    id: id,
    topicId: "learn_1",
    title: "JavaScript Basics - Summary",
    content: "Full summary content goes here. JavaScript is a programming language...",
    createdAt: "2026-07-02T10:00:00.000Z",
  };

  return sendSuccess(res, 200, "Summary fetched", dummySummary);
});

// ----------------------------------------------
// @desc    Create a summary for a topic (AI-generated later)
// @route   POST /api/summaries
// @access  Private
// ----------------------------------------------
export const createSummary = asyncHandler(async (req, res) => {
  const { topicId } = req.body;

  // LATER: call Gemini to generate a real summary and save to MongoDB

  const newSummary = {
    id: "sum_" + Date.now(),
    topicId: topicId,
    title: "New Summary",
    content: "This is a dummy AI-generated summary. Gemini will write this later.",
    createdAt: new Date().toISOString(),
  };

  return sendSuccess(res, 201, "Summary created", newSummary);
});

// ----------------------------------------------
// @desc    Delete a summary
// @route   DELETE /api/summaries/:id
// @access  Private
// ----------------------------------------------
export const deleteSummary = asyncHandler(async (req, res) => {
  const { id } = req.params;

  return sendSuccess(res, 200, `Summary ${id} deleted`, null);
});
