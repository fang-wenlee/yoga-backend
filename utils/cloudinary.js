import dotenv from "dotenv";
dotenv.config();
// configure the Cloudinary SDK with your secret keys and export a ready‑to‑use Cloudinary instance.
/*
• 	Keep backend clean
• 	Avoids repeating configuration in every route
• 	Protects API keys
• 	Makes upload route simple and readable
• 	Works perfectly with Multer’s memory storage

*/
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET,
});

console.log("Cloud name loaded:", process.env.CLOUD_NAME);
export default cloudinary;
