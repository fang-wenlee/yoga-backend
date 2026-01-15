/*
- Read the JWT token from headers or cookies
- Verify the token
- Decode the user ID
- Attach the user info to req.user
- Call next() if valid
- Block the request if invalid

*/

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Not authorized" });
		}

		const token = authHeader.split(" ")[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await User.findById(decoded.id).select("-password");

		next();
	} catch (err) {
		res.status(401).json({ message: "Token failed or expired" });
	}
};
