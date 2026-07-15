// ==============================================
// server.js - The entry point of our backend
// ==============================================
// This file:
// 1. Loads environment variables (.env)
// 2. Creates the Express app
// 3. Sets up middleware (CORS, JSON parsing, static files)
// 4. Connects all API routes
// 5. Handles errors
// 6. Starts the server

// Load environment variables FIRST, before anything else uses them
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

// Connect to MongoDB Atlas
connectDB();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ----- Import all route files -----
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import flashcardRoutes from "./routes/flashcardRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import transcriptRoutes from "./routes/transcriptRoutes.js";

// ----- Import error handling middleware -----
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// In ES modules there is no __dirname, so we create it manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the Express application
const app = express();

// ==============================================
// MIDDLEWARE (runs on every request, in order)
// ==============================================

// 1. CORS - allows our React frontend (running on a different port)
//    to make requests to this API
app.use(
  cors({
    origin: process.env.CLIENT_URL, // only allow our frontend URL
    credentials: true, // allow cookies / auth headers
  })
);

// 2. JSON parsing - lets us read JSON data sent by the frontend in req.body
app.use(express.json());

// 3. URL-encoded parsing - lets us read HTML form data in req.body
app.use(express.urlencoded({ extended: true }));

// 4. Static file serving - files inside /uploads can be opened in the browser
//    Example: http://localhost:5000/uploads/images/photo.png
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==============================================
// ROUTES
// ==============================================

// Simple health check route - useful to test if the server is running
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// All API routes are grouped by feature
app.use("/api/auth", authRoutes); // Register, login, logout, passwords
app.use("/api/users", userRoutes); // User profile and settings
app.use("/api/learning", learningRoutes); // Learning topics
app.use("/api/summaries", summaryRoutes); // AI generated summaries
app.use("/api/notes", notesRoutes); // User notes
app.use("/api/flashcards", flashcardRoutes); // Flashcard decks and cards
app.use("/api/quizzes", quizRoutes); // Quizzes and attempts
app.use("/api/bookmarks", bookmarkRoutes); // Saved/bookmarked items
app.use("/api/history", historyRoutes); // Learning activity history
app.use("/api/roadmaps", roadmapRoutes); // Learning roadmaps
app.use("/api/dashboard", dashboardRoutes); // Dashboard stats and widgets
app.use("/api/search", searchRoutes); // Global search
app.use("/api/uploads", uploadRoutes); // File uploads (Multer)
app.use("/api/ai", aiRoutes); // AI features (Gemini - later)
app.use("/api/transcript", transcriptRoutes); // YouTube video transcripts

// ==============================================
// ERROR HANDLING (must come AFTER all routes)
// ==============================================

// If no route above matched the request, this creates a 404 error
app.use(notFound);

// Any error thrown anywhere in the app ends up here
// and is sent back to the frontend as clean JSON
app.use(errorHandler);

// ==============================================
// START THE SERVER
// ==============================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
  );
});
