/*
    
- Defines routes like:
- POST /api/auth/login


simply a path + HTTP method that tells your server what to do when a request comes in. 
route as the “entry point” for each feature of your API.


*/

import express from "express";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);

//test route:   https://yoga-backend-50i3.onrender.com/auth/test

router.get("/test", (req, res) => {
	res.send("Auth route is working");
});

export default router;
