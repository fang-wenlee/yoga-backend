/*
   login
   register (if new user allowed)
   token generation
*/

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// 1. Check user exists
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "Invalid credentials" });

		// 2. Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });

		// 3. Create JWT
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		res.json({
			token,
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
			},
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
