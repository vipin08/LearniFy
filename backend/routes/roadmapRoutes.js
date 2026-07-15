// ==============================================
// routes/roadmapRoutes.js
// ==============================================
// URL prefix: /api/roadmaps  (set in server.js)
// Used by: LearningRoadmap widget on the dashboard in React.

import express from "express";
import {
  getAllRoadmaps,
  getRoadmapById,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
} from "../controllers/roadmapController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireFields } from "../middleware/validateMiddleware.js";

const router = express.Router();

// All roadmap routes need a logged-in user
router.use(protect);

// GET  /api/roadmaps - list all my roadmaps
// POST /api/roadmaps - create a roadmap (needs a goal)
router.get("/", getAllRoadmaps);
router.post("/", requireFields("goal"), createRoadmap);

// GET    /api/roadmaps/:id - get one roadmap with steps
// PUT    /api/roadmaps/:id - update a roadmap
// DELETE /api/roadmaps/:id - delete a roadmap
router.get("/:id", getRoadmapById);
router.put("/:id", updateRoadmap);
router.delete("/:id", deleteRoadmap);

export default router;
