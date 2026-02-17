import express from "express";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// GET /api/photos/cloudinary  → fetch images

router.get("/cloudinary", async (req, res) => {
	try {
		const result = await cloudinary.search
			.expression('folder="yoga-gallery"')
			.sort_by("created_at", "desc")
			.max_results(100)
			.execute();

		res.json(result.resources);
	} catch (error) {
		console.error("Cloudinary fetch error:", error);
		res.status(500).json({ error: "Failed to fetch Cloudinary images" });
	}
});

// Delete --  /api/photos/cloudinary/:public_id
// router.delete("/cloudinary/:public_id", async (req, res) => {
// 	try {
// 		const { public_id } = req.params;

// 		const result = await cloudinary.uploader.destroy(public_id);

// 		if (result.result !== "ok") {
// 			return res.status(400).json({ error: "Failed to delete image" });
// 		}

// 		res.json({ success: true, message: "Image deleted" });
// 	} catch (error) {
// 		console.error("Cloudinary delete error:", error);
// 		res.status(500).json({ error: "Failed to delete image" });
// 	}
// });

router.delete(/^\/cloudinary\/(.+)$/, async (req, res) => {
	try {
		const public_id = req.params[0]; // <-- this MUST contain the full string
		console.log("Deleting:", public_id);

		const result = await cloudinary.uploader.destroy(public_id);

		if (result.result !== "ok") {
			return res.status(400).json({ error: "Failed to delete image" });
		}

		res.json({ success: true, message: "Image deleted" });
	} catch (error) {
		console.error("Cloudinary delete error:", error);
		res.status(500).json({ error: "Failed to delete image" });
	}
});

export default router;
