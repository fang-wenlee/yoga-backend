import express from "express";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

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

export default router;
