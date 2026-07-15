// ==============================================
// controllers/uploadController.js
// ==============================================
// Handles file uploads. The actual file saving is done by
// Multer (see middleware/uploadMiddleware.js) BEFORE these
// functions run. By the time we get here, the file is already
// saved on disk and its details are available in req.file.

import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import ApiError from "../utils/ApiError.js";

// Small helper: build the info object we send back for a file
const fileInfo = (req, folder) => {
  return {
    originalName: req.file.originalname,
    fileName: req.file.filename,
    size: req.file.size, // in bytes
    mimeType: req.file.mimetype,
    // Public URL - works because of the static serving in server.js
    url: `/uploads/${folder}/${req.file.filename}`,
  };
};

// ----------------------------------------------
// @desc    Upload an image
// @route   POST /api/uploads/image  (form field name: "image")
// @access  Private
// ----------------------------------------------
export const uploadImageFile = asyncHandler(async (req, res) => {
  // If Multer didn't receive a file, req.file will be undefined
  if (!req.file) {
    throw new ApiError(400, "No image file provided. Use form field name 'image'.");
  }

  return sendSuccess(res, 201, "Image uploaded successfully", fileInfo(req, "images"));
});

// ----------------------------------------------
// @desc    Upload a document (pdf, docx, ppt, txt...)
// @route   POST /api/uploads/document  (form field name: "document")
// @access  Private
// ----------------------------------------------
export const uploadDocumentFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No document file provided. Use form field name 'document'.");
  }

  return sendSuccess(res, 201, "Document uploaded successfully", fileInfo(req, "documents"));
});

// ----------------------------------------------
// @desc    Upload a profile picture (avatar)
// @route   POST /api/uploads/avatar  (form field name: "avatar")
// @access  Private
// ----------------------------------------------
export const uploadAvatarFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No avatar file provided. Use form field name 'avatar'.");
  }

  // LATER: save the avatar URL on the user document in MongoDB

  return sendSuccess(res, 201, "Avatar uploaded successfully", fileInfo(req, "avatars"));
});
