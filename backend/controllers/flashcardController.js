// ==============================================
// controllers/flashcardController.js
// ==============================================
// Handles flashcard decks and cards - used by the
// Flashcards page and Flashcard Deck page in React.
// Dummy data for now; MongoDB comes later.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

// ----------------------------------------------
// @desc    Get all flashcard decks of the logged-in user
// @route   GET /api/flashcards
// @access  Private
// ----------------------------------------------
export const getAllDecks = asyncHandler(async (req, res) => {
  const dummyDecks = [
    {
      id: "deck_1",
      title: "JavaScript Basics",
      cardCount: 12,
      mastered: 8,
      createdAt: "2026-07-03T10:00:00.000Z",
    },
    {
      id: "deck_2",
      title: "React Hooks",
      cardCount: 10,
      mastered: 3,
      createdAt: "2026-07-08T10:00:00.000Z",
    },
  ];

  return sendSuccess(res, 200, "Flashcard decks fetched", dummyDecks);
});

// ----------------------------------------------
// @desc    Get one deck with all its cards
// @route   GET /api/flashcards/:id
// @access  Private
// ----------------------------------------------
export const getDeckById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const dummyDeck = {
    id: id,
    title: "JavaScript Basics",
    cards: [
      { id: "card_1", front: "What is a variable?", back: "A named container for a value", mastered: true },
      { id: "card_2", front: "What is a function?", back: "A reusable block of code", mastered: false },
    ],
    createdAt: "2026-07-03T10:00:00.000Z",
  };

  return sendSuccess(res, 200, "Flashcard deck fetched", dummyDeck);
});

// ----------------------------------------------
// @desc    Create a new flashcard deck
// @route   POST /api/flashcards
// @access  Private
// ----------------------------------------------
export const createDeck = asyncHandler(async (req, res) => {
  const { title, topicId } = req.body;

  // LATER: Gemini can auto-generate cards from a topic

  const newDeck = {
    id: "deck_" + Date.now(),
    title: title,
    topicId: topicId || null,
    cards: [],
    createdAt: new Date().toISOString(),
  };

  return sendSuccess(res, 201, "Flashcard deck created", newDeck);
});

// ----------------------------------------------
// @desc    Update a deck (title, or card progress)
// @route   PUT /api/flashcards/:id
// @access  Private
// ----------------------------------------------
export const updateDeck = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedDeck = {
    id: id,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "Flashcard deck updated", updatedDeck);
});

// ----------------------------------------------
// @desc    Delete a deck
// @route   DELETE /api/flashcards/:id
// @access  Private
// ----------------------------------------------
export const deleteDeck = asyncHandler(async (req, res) => {
  const { id } = req.params;

  return sendSuccess(res, 200, `Flashcard deck ${id} deleted`, null);
});
