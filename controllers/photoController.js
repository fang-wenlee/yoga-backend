import cloudinary from "../utils/cloudinary.js";
import Photo from "../models/Photo.js";

export const uploadPhoto = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: "No image uploaded" });
		}

		// Upload to Cloudinary
		const uploadResult = await new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{ folder: "yoga-gallery" },
				(error, result) => {
					if (error) reject(error);
					else resolve(result);
				}
			);
			stream.end(req.file.buffer);
		});

		// Save to MongoDB
		const newPhoto = await Photo.create({
			url: uploadResult.secure_url,
			publicId: uploadResult.public_id,
			title: req.body.title || "",
			category: req.body.category || "uncategorized",
			tags: req.body.tags || [],
			createdBy: req.user.id, // ⭐ required field
		});

		res.status(201).json(newPhoto);

		console.log("User ID:", req.user.id);
	} catch (error) {
		console.error("Upload error:", error);
		res.status(500).json({ error: "Upload failed" });
	}
};
