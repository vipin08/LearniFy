// ==============================================
// routes/historyRoutes.js
// ==============================================
// URL prefix: /api/history  (set in server.js)
// Used by: HistoryPage in React.

import express from "express";
import {
  getHistory,
  deleteHistoryItem,
  clearHistory,
} from "../controllers/historyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All history routes need a logged-in user
router.use(protect);

// GET    /api/history - get my activity history
// DELETE /api/history - clear my whole history
router.get("/", getHistory);
router.delete("/", clearHistory);

// DELETE /api/history/:id - delete one history entry
router.delete("/:id", deleteHistoryItem);

export default router;
