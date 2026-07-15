// ==============================================
// middleware/errorMiddleware.js - Error handling
// ==============================================
// These two middleware run AFTER all routes in server.js.

import ApiError from "../utils/ApiError.js";

// ----------------------------------------------
// 1. notFound - runs when NO route matched the URL
// ----------------------------------------------
// Example: GET /api/banana -> creates a 404 error and
// passes it to errorHandler below.
export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

// ----------------------------------------------
// 2. errorHandler - catches EVERY error in the app
// ----------------------------------------------
// Express knows this is an error handler because it has
// 4 parameters (err, req, res, next).
// Any controller that throws an error ends up here,
// and the frontend always gets clean JSON back.
export const errorHandler = (err, req, res, next) => {
  // Use the status code from ApiError, or default to 500 (server error)
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    data: null,
    // Show the error stack trace only during development (helps debugging)
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
