import mongoose from "mongoose";
import Photo from "./models/Photo.js"; // adjust path if needed
import dotenv from "dotenv";

dotenv.config();

async function testSchema() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to MongoDB");

		const doc = await Photo.create({
			url: "https://example.com/test.jpg",
			publicId: "test123",
			title: "Test Pose",
			category: "test",
			tags: ["yoga"],
			createdBy: new mongoose.Types.ObjectId(),
		});

		console.log("Saved:", doc);
	} catch (err) {
		console.error("Error:", err.message);
	} finally {
		mongoose.connection.close();
	}
}

testSchema();
