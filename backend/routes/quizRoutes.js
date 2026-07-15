// ==============================================
// routes/quizRoutes.js
// ==============================================
// URL prefix: /api/quizzes  (set in server.js)
// Used by: QuizzesPage, QuizPlayPage in React.

import express from "express";
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  submitQuiz,
  deleteQuiz,
} from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireFields } from "../middleware/validateMiddleware.js";

const router = express.Router();

// All quiz routes need a logged-in user
router.use(protect);

// GET  /api/quizzes - list all my quizzes
// POST /api/quizzes - create a new quiz (needs a title)
router.get("/", getAllQuizzes);
router.post("/", requireFields("title"), createQuiz);

// GET    /api/quizzes/:id        - get one quiz to play it
// POST   /api/quizzes/:id/submit - submit answers, get the score
// DELETE /api/quizzes/:id        - delete a quiz
router.get("/:id", getQuizById);
router.post("/:id/submit", requireFields("answers"), submitQuiz);
router.delete("/:id", deleteQuiz);

export default router;
