// ==============================================
// routes/dashboardRoutes.js
// ==============================================
// URL prefix: /api/dashboard  (set in server.js)
// Used by: DashboardPage widgets in React
// (StatsCards, RecentActivity, RecentNotes).

import express from "express";
import {
  getStats,
  getRecentActivity,
  getRecentNotes,
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All dashboard routes need a logged-in user
router.use(protect);

// GET /api/dashboard/stats           - numbers for the stat cards
// GET /api/dashboard/recent-activity - recent activity widget
// GET /api/dashboard/recent-notes    - recent notes widget
router.get("/stats", getStats);
router.get("/recent-activity", getRecentActivity);
router.get("/recent-notes", getRecentNotes);

export default router;
