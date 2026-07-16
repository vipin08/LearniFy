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
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose: invalid ObjectId (e.g. GET /api/notes/banana)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for ${err.path}`;
  }

  // Mongoose: schema validation failed (missing/invalid fields)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // MongoDB: duplicate unique field (e.g. email already registered)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `That ${field} is already in use`;
  }

  // Multer: file too large
  if (err.name === "MulterError") {
    statusCode = 400;
    message =
      err.code === "LIMIT_FILE_SIZE" ? "File is too large" : err.message;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    data: null,
    // Show the error stack trace only during development (helps debugging)
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
