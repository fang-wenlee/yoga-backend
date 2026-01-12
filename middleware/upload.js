import express from "express";
import multer from "multer";
import cloudinary from "../cloudinary.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
	try {
		const result = await new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{ folder: "yoga" },
				(error, uploadResult) => {
					if (error) reject(error);
					else resolve(uploadResult);
				}
			);
			stream.end(req.file.buffer);
		});

		res.json({ url: result.secure_url });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
