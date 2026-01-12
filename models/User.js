/*
   Defines the admin user schema 
   Stores email, hashed password, roles, etc. 
*/

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "admin", // you can add "user" later if needed
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model("User", UserSchema);
