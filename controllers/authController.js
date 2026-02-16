/*
   A controller:
• 	Receives the request from the route
• 	Extracts data from req.body, req.params , or req.file  
• 	Runs the business logic
• 	Talks to the database (via Mongoose)
• 	Talks to Cloudinary (for uploads)
• 	Returns a JSON response
*/

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		//console.log("EMAIL RECEIVED:", `"${email}"`);

		// 1. Check user exists
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "Invalid credentials" });

		// 2. Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });

		// 3. Create JWT token and modify expiresIn from 7d to 1h
		// const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		// 	expiresIn: "1h",
		// });

		const token = jwt.sign(
			{ id: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: "120m" },
			/* expires in 120 minutes, no matter what the frontend says, the backend will reject it after 30 minutes
			 This means that even if the frontend tries to use an old token, the backend will reject it after 120 minutes, enhancing security.
			  Create a reusable InactivityLayer */
		);
		res.json({
			token,
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
			},
		});

		console.log("USER FOUND IN DB:", user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
