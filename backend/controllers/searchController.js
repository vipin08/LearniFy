// ==============================================
// controllers/searchController.js
// ==============================================
// Handles global search - used by the Search page and
// search suggestions in the header in React.
// Dummy data for now; MongoDB comes later.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

// ----------------------------------------------
// @desc    Search across notes, quizzes, flashcards and topics
// @route   GET /api/search?q=javascript
// @access  Private
// ----------------------------------------------
export const search = asyncHandler(async (req, res) => {
  // The search text comes from the query string: /api/search?q=...
  const query = req.query.q || "";

  // LATER: run a real text search in MongoDB

  const dummyResults = {
    query: query,
    results: [
      { type: "learning", id: "learn_1", title: "JavaScript Basics" },
      { type: "note", id: "note_1", title: "JS Closures" },
      { type: "quiz", id: "quiz_1", title: "JavaScript Basics Quiz" },
      { type: "flashcard", id: "deck_1", title: "JavaScript Basics" },
    ],
    totalResults: 4,
  };

  return sendSuccess(res, 200, "Search results fetched", dummyResults);
});

// ----------------------------------------------
// @desc    Get quick search suggestions while typing
// @route   GET /api/search/suggestions?q=ja
// @access  Private
// ----------------------------------------------
export const getSuggestions = asyncHandler(async (req, res) => {
  const query = req.query.q || "";

  const dummySuggestions = [
    "JavaScript Basics",
    "JavaScript Closures",
    "Java vs JavaScript",
  ];

  return sendSuccess(res, 200, "Suggestions fetched", {
    query: query,
    suggestions: dummySuggestions,
  });
});
