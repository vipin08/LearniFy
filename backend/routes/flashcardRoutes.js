// ==============================================
// routes/flashcardRoutes.js
// ==============================================
// URL prefix: /api/flashcards  (set in server.js)
// Used by: FlashcardsPage, FlashcardDeckPage in React.

import express from "express";
import {
  getAllDecks,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck,
} from "../controllers/flashcardController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireFields } from "../middleware/validateMiddleware.js";

const router = express.Router();

// All flashcard routes need a logged-in user
router.use(protect);

// GET  /api/flashcards - list all my decks
// POST /api/flashcards - create a new deck (needs a title)
router.get("/", getAllDecks);
router.post("/", requireFields("title"), createDeck);

// GET    /api/flashcards/:id - get one deck with its cards
// PUT    /api/flashcards/:id - update a deck
// DELETE /api/flashcards/:id - delete a deck
router.get("/:id", getDeckById);
router.put("/:id", updateDeck);
router.delete("/:id", deleteDeck);

export default router;
