// ==============================================
// routes/summaryRoutes.js
// ==============================================
// URL prefix: /api/summaries  (set in server.js)
// Handles AI-generated summaries of learning topics.

import express from "express";
import {
  getAllSummaries,
  getSummaryById,
  createSummary,
  deleteSummary,
} from "../controllers/summaryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireFields } from "../middleware/validateMiddleware.js";

const router = express.Router();

// All summary routes need a logged-in user
router.use(protect);

// GET  /api/summaries - list all my summaries
// POST /api/summaries - create a summary for a topic
router.get("/", getAllSummaries);
router.post("/", requireFields("topicId"), createSummary);

// GET    /api/summaries/:id - get one summary
// DELETE /api/summaries/:id - delete a summary
router.get("/:id", getSummaryById);
router.delete("/:id", deleteSummary);

export default router;
