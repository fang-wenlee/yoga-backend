import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes here
app.use("/api/photos", photoRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("Server is running"));

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");

		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
	});
