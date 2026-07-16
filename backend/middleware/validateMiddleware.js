// ==============================================
// middleware/validateMiddleware.js - Request validation
// ==============================================
// Simple validation helpers that check req.body BEFORE the
// controller runs. If something is missing or wrong, we stop
// the request with a 400 (Bad Request) error.
//
// We keep this simple on purpose (no validation library needed).

import ApiError from "../utils/ApiError.js";

const EMAIL_REGEX = /^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)+$/;
const STRONG_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

// Small helper: checks if an email looks valid and keeps symbols out
const isValidEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

// Password must be at least 8 characters with uppercase, number, and symbol
const isStrongPassword = (password) => {
  return STRONG_PASSWORD_REGEX.test(password);
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
  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const cleanPassword = typeof password === "string" ? password : "";

  if (!cleanName || !cleanEmail || !cleanPassword) {
    return next(new ApiError(400, "Name, email and password are required"));
  }

  if (!isValidEmail(cleanEmail)) {
    return next(
      new ApiError(
        400,
        "Email can only use letters and numbers, with @ as the separator"
      )
    );
  }

  if (!isStrongPassword(cleanPassword)) {
    return next(
      new ApiError(
        400,
        "Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 special character"
      )
    );
  }

  req.body.name = cleanName;
  req.body.email = cleanEmail;
  req.body.password = cleanPassword;

  next();
};

// ----------------------------------------------
// Validate the login form
// ----------------------------------------------
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!cleanEmail || !password) {
    return next(new ApiError(400, "Email and password are required"));
  }

  if (!isValidEmail(cleanEmail)) {
    return next(
      new ApiError(
        400,
        "Email can only use letters and numbers, with @ as the separator"
      )
    );
  }

  req.body.email = cleanEmail;

  next();
};
