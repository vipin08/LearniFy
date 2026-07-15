// ==============================================
// utils/asyncHandler.js - Wrapper for async controllers
// ==============================================
// Problem: if an async function throws an error, Express does not
// catch it automatically - the server could crash or hang.
//
// Solution: wrap every controller in this helper. If the promise
// rejects (an error is thrown), .catch(next) passes the error to
// our error handling middleware.
//
// Usage:
//   export const getNotes = asyncHandler(async (req, res) => { ... });

const asyncHandler = (fn) => {
  return (req, res, next) => {
    // Run the controller and forward any error to the error middleware
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
