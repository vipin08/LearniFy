// ==============================================
// routes/notesRoutes.js
// ==============================================
// URL prefix: /api/notes  (set in server.js)
// Used by: NotesPage in React.

import express from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireFields } from "../middleware/validateMiddleware.js";

const router = express.Router();

// All note routes need a logged-in user
router.use(protect);

// GET  /api/notes - list all my notes
// POST /api/notes - create a note (needs title and content)
router.get("/", getAllNotes);
router.post("/", requireFields("title", "content"), createNote);

// GET    /api/notes/:id - get one note
// PUT    /api/notes/:id - update a note
// DELETE /api/notes/:id - delete a note
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
