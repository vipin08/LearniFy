// ==============================================
// controllers/roadmapController.js
// ==============================================
// Handles learning roadmaps (step-by-step study plans) -
// used by the dashboard's Learning Roadmap widget in React.
// Dummy data for now; MongoDB + Gemini come later.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

// ----------------------------------------------
// @desc    Get all roadmaps of the logged-in user
// @route   GET /api/roadmaps
// @access  Private
// ----------------------------------------------
export const getAllRoadmaps = asyncHandler(async (req, res) => {
  const dummyRoadmaps = [
    {
      id: "road_1",
      title: "Full-Stack Web Development",
      totalSteps: 6,
      completedSteps: 2,
      createdAt: "2026-06-20T10:00:00.000Z",
    },
  ];

  return sendSuccess(res, 200, "Roadmaps fetched", dummyRoadmaps);
});

// ----------------------------------------------
// @desc    Get one roadmap with all its steps
// @route   GET /api/roadmaps/:id
// @access  Private
// ----------------------------------------------
export const getRoadmapById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const dummyRoadmap = {
    id: id,
    title: "Full-Stack Web Development",
    steps: [
      { id: "step_1", title: "HTML & CSS", completed: true },
      { id: "step_2", title: "JavaScript", completed: true },
      { id: "step_3", title: "React", completed: false },
      { id: "step_4", title: "Node.js & Express", completed: false },
      { id: "step_5", title: "MongoDB", completed: false },
      { id: "step_6", title: "Full-Stack Project", completed: false },
    ],
    createdAt: "2026-06-20T10:00:00.000Z",
  };

  return sendSuccess(res, 200, "Roadmap fetched", dummyRoadmap);
});

// ----------------------------------------------
// @desc    Create a new roadmap (AI-generated later)
// @route   POST /api/roadmaps
// @access  Private
// ----------------------------------------------
export const createRoadmap = asyncHandler(async (req, res) => {
  const { goal } = req.body;

  // LATER: Gemini will generate the roadmap steps from the goal

  const newRoadmap = {
    id: "road_" + Date.now(),
    title: goal,
    steps: [],
    createdAt: new Date().toISOString(),
  };

  return sendSuccess(res, 201, "Roadmap created", newRoadmap);
});

// ----------------------------------------------
// @desc    Update a roadmap (e.g. mark a step complete)
// @route   PUT /api/roadmaps/:id
// @access  Private
// ----------------------------------------------
export const updateRoadmap = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedRoadmap = {
    id: id,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  return sendSuccess(res, 200, "Roadmap updated", updatedRoadmap);
});

// ----------------------------------------------
// @desc    Delete a roadmap
// @route   DELETE /api/roadmaps/:id
// @access  Private
// ----------------------------------------------
export const deleteRoadmap = asyncHandler(async (req, res) => {
  const { id } = req.params;

  return sendSuccess(res, 200, `Roadmap ${id} deleted`, null);
});
