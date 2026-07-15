// ==============================================
// controllers/aiController.js
// ==============================================
// Handles all AI features. ONLY the route structure exists
// for now - the real Gemini API connection comes later.
// Every function returns dummy data in the exact shape the
// frontend will receive once Gemini is connected.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

// ----------------------------------------------
// @desc    Ask the AI to explain a topic
// @route   POST /api/ai/explain
// @access  Private
// ----------------------------------------------
export const explainTopic = asyncHandler(async (req, res) => {
  const { topic, level } = req.body;

  // LATER: send this prompt to the Gemini API

  const dummyExplanation = {
    topic: topic,
    level: level || "beginner",
    explanation: `This is a dummy AI explanation of "${topic}". The real explanation will come from Gemini later.`,
    generatedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "Explanation generated", dummyExplanation);
});

// ----------------------------------------------
// @desc    Ask the AI to summarize text or a topic
// @route   POST /api/ai/summarize
// @access  Private
// ----------------------------------------------
export const summarizeContent = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const dummySummary = {
    originalLength: content ? content.length : 0,
    summary: "This is a dummy AI summary. Gemini will generate the real one later.",
    generatedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "Summary generated", dummySummary);
});

// ----------------------------------------------
// @desc    Ask the AI to generate flashcards for a topic
// @route   POST /api/ai/generate-flashcards
// @access  Private
// ----------------------------------------------
export const generateFlashcards = asyncHandler(async (req, res) => {
  const { topic, count } = req.body;

  const dummyCards = {
    topic: topic,
    cards: [
      { front: `Dummy question 1 about ${topic}`, back: "Dummy answer 1" },
      { front: `Dummy question 2 about ${topic}`, back: "Dummy answer 2" },
    ],
    requestedCount: count || 10,
    generatedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "Flashcards generated", dummyCards);
});

// ----------------------------------------------
// @desc    Ask the AI to generate a quiz for a topic
// @route   POST /api/ai/generate-quiz
// @access  Private
// ----------------------------------------------
export const generateQuiz = asyncHandler(async (req, res) => {
  const { topic, questionCount } = req.body;

  const dummyQuiz = {
    topic: topic,
    questions: [
      {
        question: `Dummy question about ${topic}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
      },
    ],
    requestedCount: questionCount || 10,
    generatedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "Quiz generated", dummyQuiz);
});

// ----------------------------------------------
// @desc    Ask the AI to generate a learning roadmap
// @route   POST /api/ai/generate-roadmap
// @access  Private
// ----------------------------------------------
export const generateRoadmap = asyncHandler(async (req, res) => {
  const { goal } = req.body;

  const dummyRoadmap = {
    goal: goal,
    steps: [
      { order: 1, title: "Dummy Step 1", description: "Learn the basics" },
      { order: 2, title: "Dummy Step 2", description: "Build a small project" },
      { order: 3, title: "Dummy Step 3", description: "Go deeper into the topic" },
    ],
    generatedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "Roadmap generated", dummyRoadmap);
});

// ----------------------------------------------
// @desc    Chat with the AI tutor
// @route   POST /api/ai/chat
// @access  Private
// ----------------------------------------------
export const chatWithAI = asyncHandler(async (req, res) => {
  const { message } = req.body;

  const dummyReply = {
    userMessage: message,
    reply: "This is a dummy AI reply. Gemini will answer for real later.",
    generatedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "AI reply generated", dummyReply);
});
