// ==============================================
// routes/authRoutes.js
// ==============================================
// URL prefix: /api/auth  (set in server.js)
//
// A route file only does ONE job: it maps URLs to
// controller functions. The logic lives in the controller.

import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateRegister,
  validateLogin,
  requireFields,
} from "../middleware/validateMiddleware.js";

const router = express.Router();

// ----- Public routes (no login needed) -----

// POST /api/auth/register - create a new account (legacy alias)
router.post("/register", validateRegister, registerUser);

// POST /api/auth/signup - create a new account
router.post("/signup", validateRegister, registerUser);

// POST /api/auth/login - log in
router.post("/login", validateLogin, loginUser);

// POST /api/auth/forgot-password - request a reset link
router.post("/forgot-password", requireFields("email"), forgotPassword);

// POST /api/auth/reset-password/:token - set a new password
router.post("/reset-password/:token", requireFields("password"), resetPassword);

// ----- Private routes (valid token needed) -----

// POST /api/auth/logout - log out
router.post("/logout", protect, logoutUser);

// GET /api/auth/me - who am I? (used when the app loads)
router.get("/me", protect, getMe);

// GET /api/auth/profile - who am I? (profile route)
router.get("/profile", protect, getMe);

export default router;
