/*

This script creates an admin user in the MongoDB database.
   Run this script once to set up the initial admin account.
   purpose: help to create the initial admin user and verify DB connection

*/

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

async function createAdmin() {
	try {
		// await mongoose.connect(process.env.MONGODB_URI);
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "yoga_gallery",
		});

		console.log("Connected to DB:", mongoose.connection.name);
		const hashedPassword = await bcrypt.hash("admin123", 10);

		const admin = await User.create({
			name: "Admin",
			email: "admin@example.com",
			password: hashedPassword,
		});

		console.log("Admin user created:");
		console.log(admin);

		mongoose.connection.close();
	} catch (err) {
		console.error(err);
		mongoose.connection.close();
	}
}

createAdmin();
