// ==============================================
// middleware/validateMiddleware.js - Request validation
// ==============================================
// Simple validation helpers that check req.body BEFORE the
// controller runs. If something is missing or wrong, we stop
// the request with a 400 (Bad Request) error.
//
// We keep this simple on purpose (no validation library needed).

import ApiError from "../utils/ApiError.js";

// Small helper: checks if an email looks valid (something@something.com)
const isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

// ----------------------------------------------
// Generic validator: checks that required fields exist
// ----------------------------------------------
// Usage in a route:
//   router.post("/", requireFields("title", "content"), createNote);
export const requireFields = (...fields) => {
  return (req, res, next) => {
    // Collect all the fields that are missing or empty
    const missing = fields.filter(
      (field) => !req.body || req.body[field] === undefined || req.body[field] === ""
    );

    if (missing.length > 0) {
      return next(new ApiError(400, `Missing required fields: ${missing.join(", ")}`));
    }

    next();
  };
};

// ----------------------------------------------
// Validate the register form
// ----------------------------------------------
export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return next(new ApiError(400, "Name, email and password are required"));
  }

  if (!isValidEmail(email)) {
    return next(new ApiError(400, "Please provide a valid email address"));
  }

  if (password.length < 6) {
    return next(new ApiError(400, "Password must be at least 6 characters long"));
  }

  next();
};

// ----------------------------------------------
// Validate the login form
// ----------------------------------------------
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return next(new ApiError(400, "Email and password are required"));
  }

  if (!isValidEmail(email)) {
    return next(new ApiError(400, "Please provide a valid email address"));
  }

  next();
};
