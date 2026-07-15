// ==============================================
// utils/response.js - Reusable response helpers
// ==============================================
// Instead of writing res.status(...).json(...) with a different
// shape in every controller, we use these two functions so every
// API response looks the same. This makes the frontend's job easy:
// it always receives { success, message, data }.

// Send a SUCCESS response
// Example: sendSuccess(res, 200, "User found", { name: "Robin" })
export const sendSuccess = (res, statusCode = 200, message = "Success", data = null) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
  });
};

// Send an ERROR response
// Example: sendError(res, 404, "User not found")
export const sendError = (res, statusCode = 500, message = "Something went wrong") => {
  return res.status(statusCode).json({
    success: false,
    message: message,
    data: null,
  });
};
