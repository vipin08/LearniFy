// ==============================================
// routes/aiRoutes.js
// ==============================================
// URL prefix: /api/ai  (set in server.js)
// ONLY the route structure exists for now - the real
// Gemini API connection will be added later inside the
// controllers. The routes and request/response shapes
// are final so the frontend can already be built.

import express from "express";
import {
  explainTopic,
  summarizeContent,
  generateFlashcards,
  generateQuiz,
  generateRoadmap,
  chatWithAI,
} from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireFields } from "../middleware/validateMiddleware.js";

const router = express.Router();

// All AI routes need a logged-in user
router.use(protect);

// POST /api/ai/explain             - explain a topic
// POST /api/ai/summarize           - summarize content
// POST /api/ai/generate-flashcards - create flashcards for a topic
// POST /api/ai/generate-quiz       - create a quiz for a topic
// POST /api/ai/generate-roadmap    - create a learning roadmap
// POST /api/ai/chat                - chat with the AI tutor
router.post("/explain", requireFields("topic"), explainTopic);
router.post("/summarize", requireFields("content"), summarizeContent);
router.post("/generate-flashcards", requireFields("topic"), generateFlashcards);
router.post("/generate-quiz", requireFields("topic"), generateQuiz);
router.post("/generate-roadmap", requireFields("goal"), generateRoadmap);
router.post("/chat", requireFields("message"), chatWithAI);

export default router;
