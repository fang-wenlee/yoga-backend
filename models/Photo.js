import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
	url: { type: String, required: true },
	publicId: { type: String, required: true },
	title: { type: String, default: "" },
	category: { type: String, default: "uncategorized" },
	tags: { type: [String], default: [] },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Photo", PhotoSchema);
