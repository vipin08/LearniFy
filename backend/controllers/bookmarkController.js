// ==============================================
// controllers/bookmarkController.js
// ==============================================
// Handles bookmarks (saved items) - used by the
// Bookmarks page in React.
// Dummy data for now; MongoDB comes later.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

// ----------------------------------------------
// @desc    Get all bookmarks of the logged-in user
// @route   GET /api/bookmarks
// @access  Private
// ----------------------------------------------
export const getAllBookmarks = asyncHandler(async (req, res) => {
  const dummyBookmarks = [
    {
      id: "bm_1",
      itemType: "note", // can be: note, quiz, flashcard, learning
      itemId: "note_1",
      title: "JS Closures",
      createdAt: "2026-07-11T10:00:00.000Z",
    },
    {
      id: "bm_2",
      itemType: "learning",
      itemId: "learn_2",
      title: "React Fundamentals",
      createdAt: "2026-07-12T10:00:00.000Z",
    },
  ];

  return sendSuccess(res, 200, "Bookmarks fetched", dummyBookmarks);
});

// ----------------------------------------------
// @desc    Add a new bookmark
// @route   POST /api/bookmarks
// @access  Private
// ----------------------------------------------
export const addBookmark = asyncHandler(async (req, res) => {
  const { itemType, itemId, title } = req.body;

  const newBookmark = {
    id: "bm_" + Date.now(),
    itemType: itemType,
    itemId: itemId,
    title: title || "",
    createdAt: new Date().toISOString(),
  };

  return sendSuccess(res, 201, "Bookmark added", newBookmark);
});

// ----------------------------------------------
// @desc    Remove a bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
// ----------------------------------------------
export const removeBookmark = asyncHandler(async (req, res) => {
  const { id } = req.params;

  return sendSuccess(res, 200, `Bookmark ${id} removed`, null);
});
