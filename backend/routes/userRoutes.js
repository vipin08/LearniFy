// ==============================================
// routes/userRoutes.js
// ==============================================
// URL prefix: /api/users  (set in server.js)
// Used by the Profile page and Settings page in React.

import express from "express";
import {
  getProfile,
  updateProfile,
  changePassword,
  getSettings,
  updateSettings,
  deleteAccount,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireFields } from "../middleware/validateMiddleware.js";

const router = express.Router();

// Every route in this file needs a logged-in user.
// router.use(protect) applies the middleware to ALL routes below.
router.use(protect);

// GET  /api/users/profile - get my profile
// PUT  /api/users/profile - update my profile
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

// PUT /api/users/change-password - change my password
router.put(
  "/change-password",
  requireFields("oldPassword", "newPassword"),
  changePassword
);

// GET /api/users/settings - get my settings
// PUT /api/users/settings - update my settings
router.get("/settings", getSettings);
router.put("/settings", updateSettings);

// DELETE /api/users/account - delete my account
router.delete("/account", deleteAccount);

export default router;
