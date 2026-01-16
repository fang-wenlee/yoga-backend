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

const requireAuth = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ error: "No token provided" });
		}

		const token = authHeader.split(" ")[1];

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach user info to req.user
		req.user = { id: decoded.id };

		next();
	} catch (error) {
		console.error("Auth error:", error);
		res.status(401).json({ error: "Invalid or expired token" });
	}
};

export default requireAuth;
