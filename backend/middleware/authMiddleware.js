// ==============================================
// middleware/authMiddleware.js - Route protection
// ==============================================
// This middleware runs BEFORE protected controllers.
// It checks: "Does this request have a valid JWT token?"
//
// The frontend must send the token in a header like this:
//   Authorization: Bearer <token>
//
// NOTE: Right now we only verify the token itself.
// Later, when MongoDB is connected, we will also load the
// full user from the database here.

import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // 1. Read the Authorization header
    const authHeader = req.headers.authorization;

    // 2. It must exist and start with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Not authorized, no token provided");
    }

    // 3. Take out just the token part ("Bearer abc123" -> "abc123")
    const token = authHeader.split(" ")[1];

    // 4. Verify the token using our secret key.
    //    If the token is fake or expired, jwt.verify throws an error.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach the user info from the token to the request,
    //    so controllers can use req.user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new ApiError(401, "Not authorized, user not found");
    }
    req.user = user;

    // 6. Everything is fine - continue to the controller
    next();
  } catch (error) {
    // jwt.verify errors (invalid/expired token) land here too
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(new ApiError(401, "Not authorized, token is invalid or expired"));
    }
  }
};
