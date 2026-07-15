// ==============================================
// routes/learningRoutes.js
// ==============================================
// URL prefix: /api/learning  (set in server.js)
// Used by: LearningPage, LearningDetailPage, LearnNewPage in React.

import express from "express";
import {
  getAllLearning,
  getLearningById,
  createLearning,
  updateLearning,
  deleteLearning,
} from "../controllers/learningController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireFields } from "../middleware/validateMiddleware.js";

const router = express.Router();

// All learning routes need a logged-in user
router.use(protect);

// GET  /api/learning      - list all my topics
// POST /api/learning      - start a new topic (requires "topic" in body)
router.get("/", getAllLearning);
router.post("/", requireFields("topic"), createLearning);

// GET    /api/learning/:id - get one topic
// PUT    /api/learning/:id - update a topic
// DELETE /api/learning/:id - delete a topic
router.get("/:id", getLearningById);
router.put("/:id", updateLearning);
router.delete("/:id", deleteLearning);

export default router;
