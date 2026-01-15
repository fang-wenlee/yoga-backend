/*
    
- Defines routes like:
- POST /api/auth/login
- POST /api/auth/register (optional)

simply a path + HTTP method that tells your server what to do when a request comes in. 
route as the “entry point” for each feature of your API.


*/

import express from "express";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);

router.get("/test", (req, res) => {
	res.send("Auth route is working");
});

export default router;
