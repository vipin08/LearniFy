// ==============================================
// utils/ApiError.js - Custom error class
// ==============================================
// A normal JavaScript Error only has a message.
// Our ApiError also carries an HTTP status code, so when a
// controller throws it, the error middleware knows exactly
// which status code to send back (404, 400, 401, etc).
//
// Usage inside a controller:
//   throw new ApiError(404, "Note not found");

class ApiError extends Error {
  constructor(statusCode, message) {
    // Call the parent Error class with the message
    super(message);

    // Attach the HTTP status code (e.g. 404)
    this.statusCode = statusCode;
  }
}

export default ApiError;
