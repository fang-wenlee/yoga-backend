import express from "express";
import cors from "cors";
import uploadRoute from "./routes/upload.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Upload route
app.use("/upload", uploadRoute);

app.get("/", (req, res) => res.send("Server is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
