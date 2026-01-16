import express from "express";
import multer from "multer";
import requireAuth from "../middleware/authMiddleware.js";
import { uploadPhoto } from "../controllers/photoController.js";

const router = express.Router();

// Multer memory storage for Cloudinary upload_stream
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/photos
router.post("/", requireAuth, upload.single("image"), uploadPhoto);

export default router;
