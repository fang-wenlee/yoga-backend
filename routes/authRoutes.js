/*
    
- Defines routes like:
- POST /api/auth/login
- POST /api/auth/register (optional)


*/

import express from "express";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);

router.get("/test", (req, res) => {
	res.send("Auth route is working");
});

export default router;
