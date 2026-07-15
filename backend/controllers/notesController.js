// ==============================================
// controllers/notesController.js
// ==============================================
// Handles user notes - used by the Notes page in React.
// Dummy data for now; MongoDB comes later.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

// ----------------------------------------------
// @desc    Get all notes of the logged-in user
// @route   GET /api/notes
// @access  Private
// ----------------------------------------------
export const getAllNotes = asyncHandler(async (req, res) => {
  const dummyNotes = [
    {
      id: "note_1",
      title: "JS Closures",
      content: "A closure is a function that remembers its outer variables...",
      tags: ["javascript"],
      createdAt: "2026-07-10T10:00:00.000Z",
    },
    {
      id: "note_2",
      title: "React useState",
      content: "useState lets a component remember values between renders...",
      tags: ["react"],
      createdAt: "2026-07-12T10:00:00.000Z",
    },
  ];

  return sendSuccess(res, 200, "Notes fetched", dummyNotes);
});

// ----------------------------------------------
// @desc    Get one note by its id
// @route   GET /api/notes/:id
// @access  Private
// ----------------------------------------------
export const getNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const dummyNote = {
    id: id,
    title: "JS Closures",
    content: "A closure is a function that remembers its outer variables...",
    tags: ["javascript"],
    createdAt: "2026-07-10T10:00:00.000Z",
  };

  return sendSuccess(res, 200, "Note fetched", dummyNote);
});

// ----------------------------------------------
// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
// ----------------------------------------------
export const createNote = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;

  const newNote = {
    id: "note_" + Date.now(),
    title: title,
    content: content,
    tags: tags || [],
    createdAt: new Date().toISOString(),
  };

  return sendSuccess(res, 201, "Note created", newNote);
});

// ----------------------------------------------
// @desc    Update an existing note
// @route   PUT /api/notes/:id
// @access  Private
// ----------------------------------------------
export const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedNote = {
    id: id,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "Note updated", updatedNote);
});

// ----------------------------------------------
// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
// ----------------------------------------------
export const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  return sendSuccess(res, 200, `Note ${id} deleted`, null);
});
