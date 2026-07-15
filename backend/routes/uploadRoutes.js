// ==============================================
// routes/uploadRoutes.js
// ==============================================
// URL prefix: /api/uploads  (set in server.js)
// Handles file uploads using Multer.
//
// The Multer middleware (uploadImage, uploadDocument, uploadAvatar)
// runs FIRST: it saves the file to disk and fills req.file.
// Then the controller runs and sends back the file info.
//
// .single("image") means: expect ONE file in a form field named "image".

import express from "express";
import {
  uploadImageFile,
  uploadDocumentFile,
  uploadAvatarFile,
} from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  uploadImage,
  uploadDocument,
  uploadAvatar,
} from "../middleware/uploadMiddleware.js";

const router = express.Router();

// All upload routes need a logged-in user
router.use(protect);

// POST /api/uploads/image    - upload a picture   (field name: "image")
// POST /api/uploads/document - upload a document  (field name: "document")
// POST /api/uploads/avatar   - upload an avatar   (field name: "avatar")
router.post("/image", uploadImage.single("image"), uploadImageFile);
router.post("/document", uploadDocument.single("document"), uploadDocumentFile);
router.post("/avatar", uploadAvatar.single("avatar"), uploadAvatarFile);

export default router;
