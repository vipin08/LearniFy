// ==============================================
// routes/bookmarkRoutes.js
// ==============================================
// URL prefix: /api/bookmarks  (set in server.js)
// Used by: BookmarksPage in React.

import express from "express";
import {
  getAllBookmarks,
  addBookmark,
  removeBookmark,
} from "../controllers/bookmarkController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireFields } from "../middleware/validateMiddleware.js";

const router = express.Router();

// All bookmark routes need a logged-in user
router.use(protect);

// GET  /api/bookmarks - list all my bookmarks
// POST /api/bookmarks - add a bookmark (what type of item + its id)
router.get("/", getAllBookmarks);
router.post("/", requireFields("itemType", "itemId"), addBookmark);

// DELETE /api/bookmarks/:id - remove a bookmark
router.delete("/:id", removeBookmark);

export default router;
