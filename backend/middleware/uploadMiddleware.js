// ==============================================
// middleware/uploadMiddleware.js - File uploads (Multer)
// ==============================================
// Multer is the standard Express library for handling file uploads.
// It reads "multipart/form-data" requests (the format browsers use
// to send files) and saves the file to disk.
//
// We keep three separate folders:
//   uploads/images     - pictures (jpg, png, ...)
//   uploads/documents  - study material (pdf, doc, ppt, txt)
//   uploads/avatars    - profile pictures

import multer from "multer";
import path from "path";
import fs from "fs";
import ApiError from "../utils/ApiError.js";

// ----------------------------------------------
// Helper: create a Multer "storage" for a given folder
// ----------------------------------------------
const createStorage = (folderName) => {
  const uploadPath = path.join(process.cwd(), "uploads", folderName);

  // Make sure the folder exists (create it if it doesn't)
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    // WHERE to save the file
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    // WHAT to name the file
    // We add a timestamp so two files with the same name don't clash.
    // Example: "notes.pdf" -> "notes-1716809000000.pdf"
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // ".pdf"
      const base = path.basename(file.originalname, ext); // "notes"
      cb(null, `${base}-${Date.now()}${ext}`);
    },
  });
};

// ----------------------------------------------
// File filters: only allow certain file types
// ----------------------------------------------
const imageFilter = (req, file, cb) => {
  const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.includes(ext)) {
    cb(null, true); // accept the file
  } else {
    cb(new ApiError(400, "Only image files are allowed (jpg, jpeg, png, gif, webp)"));
  }
};

const documentFilter = (req, file, cb) => {
  const allowed = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".txt", ".md"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only document files are allowed (pdf, doc, docx, ppt, pptx, txt, md)"));
  }
};

// ----------------------------------------------
// The three uploaders used by our routes
// ----------------------------------------------

// For general images (max 5 MB)
export const uploadImage = multer({
  storage: createStorage("images"),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// For documents like PDFs (max 20 MB)
export const uploadDocument = multer({
  storage: createStorage("documents"),
  fileFilter: documentFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

// For profile pictures (max 2 MB)
export const uploadAvatar = multer({
  storage: createStorage("avatars"),
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
