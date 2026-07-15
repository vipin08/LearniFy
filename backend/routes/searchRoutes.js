// ==============================================
// routes/searchRoutes.js
// ==============================================
// URL prefix: /api/search  (set in server.js)
// Used by: SearchPage and the header search bar in React.

import express from "express";
import { search, getSuggestions } from "../controllers/searchController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All search routes need a logged-in user
router.use(protect);

// GET /api/search?q=javascript          - full search results
// GET /api/search/suggestions?q=ja      - quick suggestions while typing
router.get("/", search);
router.get("/suggestions", getSuggestions);

export default router;
