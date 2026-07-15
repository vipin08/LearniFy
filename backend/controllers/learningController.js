// ==============================================
// controllers/learningController.js
// ==============================================
// Handles learning topics - used by the Learning page,
// Learning Detail page and "Learn New" page in React.
//
// Dummy data for now; MongoDB comes later.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

// ----------------------------------------------
// @desc    Get all learning topics of the logged-in user
// @route   GET /api/learning
// @access  Private
// ----------------------------------------------
export const getAllLearning = asyncHandler(async (req, res) => {
  const dummyTopics = [
    {
      id: "learn_1",
      title: "JavaScript Basics",
      description: "Variables, functions, loops and objects",
      progress: 75,
      createdAt: "2026-07-01T10:00:00.000Z",
    },
    {
      id: "learn_2",
      title: "React Fundamentals",
      description: "Components, props, state and hooks",
      progress: 40,
      createdAt: "2026-07-05T10:00:00.000Z",
    },
  ];

  return sendSuccess(res, 200, "Learning topics fetched", dummyTopics);
});

// ----------------------------------------------
// @desc    Get one learning topic by its id
// @route   GET /api/learning/:id
// @access  Private
// ----------------------------------------------
export const getLearningById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const dummyTopic = {
    id: id,
    title: "JavaScript Basics",
    description: "Variables, functions, loops and objects",
    progress: 75,
    content: "This is the detailed learning content for this topic...",
    sections: [
      { id: "sec_1", title: "Introduction", completed: true },
      { id: "sec_2", title: "Core Concepts", completed: true },
      { id: "sec_3", title: "Practice", completed: false },
    ],
    createdAt: "2026-07-01T10:00:00.000Z",
  };

  return sendSuccess(res, 200, "Learning topic fetched", dummyTopic);
});

// ----------------------------------------------
// @desc    Start learning a new topic
// @route   POST /api/learning
// @access  Private
// ----------------------------------------------
export const createLearning = asyncHandler(async (req, res) => {
  const { topic, level } = req.body;

  // LATER: save to MongoDB, and use Gemini to generate the content

  const newTopic = {
    id: "learn_" + Date.now(),
    title: topic,
    level: level || "beginner",
    progress: 0,
    createdAt: new Date().toISOString(),
  };

  return sendSuccess(res, 201, "Learning topic created", newTopic);
});

// ----------------------------------------------
// @desc    Update a learning topic (e.g. progress)
// @route   PUT /api/learning/:id
// @access  Private
// ----------------------------------------------
export const updateLearning = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedTopic = {
    id: id,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "Learning topic updated", updatedTopic);
});

// ----------------------------------------------
// @desc    Delete a learning topic
// @route   DELETE /api/learning/:id
// @access  Private
// ----------------------------------------------
export const deleteLearning = asyncHandler(async (req, res) => {
  const { id } = req.params;

  return sendSuccess(res, 200, `Learning topic ${id} deleted`, null);
});
