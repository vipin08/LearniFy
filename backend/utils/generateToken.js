// ==============================================
// utils/generateToken.js - Create JWT tokens
// ==============================================
// A JWT (JSON Web Token) is like a signed ID card.
// After a user logs in, we give them a token. On every future
// request they send it back, and we can verify it was really
// signed by us (using the JWT_SECRET from .env).

import jwt from "jsonwebtoken";

// Create a token that stores the user's id inside it
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, // payload - data stored inside the token
    process.env.JWT_SECRET, // secret key used to sign it
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" } // token validity
  );
};

export default generateToken;
