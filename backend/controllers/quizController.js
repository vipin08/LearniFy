// ==============================================
// controllers/quizController.js
// ==============================================
// Handles quizzes - used by the Quizzes page and
// Quiz Play page in React.
// Dummy data for now; MongoDB comes later.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

// ----------------------------------------------
// @desc    Get all quizzes of the logged-in user
// @route   GET /api/quizzes
// @access  Private
// ----------------------------------------------
export const getAllQuizzes = asyncHandler(async (req, res) => {
  const dummyQuizzes = [
    {
      id: "quiz_1",
      title: "JavaScript Basics Quiz",
      questionCount: 10,
      bestScore: 80,
      attempts: 2,
      createdAt: "2026-07-04T10:00:00.000Z",
    },
    {
      id: "quiz_2",
      title: "React Fundamentals Quiz",
      questionCount: 8,
      bestScore: null, // not attempted yet
      attempts: 0,
      createdAt: "2026-07-09T10:00:00.000Z",
    },
  ];

  return sendSuccess(res, 200, "Quizzes fetched", dummyQuizzes);
});

// ----------------------------------------------
// @desc    Get one quiz with its questions (to play it)
// @route   GET /api/quizzes/:id
// @access  Private
// ----------------------------------------------
export const getQuizById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const dummyQuiz = {
    id: id,
    title: "JavaScript Basics Quiz",
    questions: [
      {
        id: "q_1",
        question: "Which keyword declares a constant?",
        options: ["var", "let", "const", "static"],
        // NOTE: in a real app we would NOT send the answer with the questions
      },
      {
        id: "q_2",
        question: "What does JSON stand for?",
        options: [
          "JavaScript Object Notation",
          "Java Standard Object Notation",
          "JavaScript Ordered Names",
          "None of these",
        ],
      },
    ],
    createdAt: "2026-07-04T10:00:00.000Z",
  };

  return sendSuccess(res, 200, "Quiz fetched", dummyQuiz);
});

// ----------------------------------------------
// @desc    Create a new quiz (AI-generated later)
// @route   POST /api/quizzes
// @access  Private
// ----------------------------------------------
export const createQuiz = asyncHandler(async (req, res) => {
  const { title, topicId, questionCount } = req.body;

  // LATER: Gemini will generate real questions from the topic

  const newQuiz = {
    id: "quiz_" + Date.now(),
    title: title,
    topicId: topicId || null,
    questionCount: questionCount || 10,
    createdAt: new Date().toISOString(),
  };

  return sendSuccess(res, 201, "Quiz created", newQuiz);
});

// ----------------------------------------------
// @desc    Submit quiz answers and get the result
// @route   POST /api/quizzes/:id/submit
// @access  Private
// ----------------------------------------------
export const submitQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body; // e.g. { q_1: "const", q_2: "JavaScript Object Notation" }

  // LATER: compare answers with correct ones stored in MongoDB

  const dummyResult = {
    quizId: id,
    totalQuestions: 2,
    correct: 2,
    wrong: 0,
    score: 100,
    submittedAnswers: answers || {},
    completedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "Quiz submitted successfully", dummyResult);
});

// ----------------------------------------------
// @desc    Delete a quiz
// @route   DELETE /api/quizzes/:id
// @access  Private
// ----------------------------------------------
export const deleteQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;

  return sendSuccess(res, 200, `Quiz ${id} deleted`, null);
});
