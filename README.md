### Step 1 — Create Your Backend Folder

yogaBack/

Inside it, initialize a Node project:

npm init -y

This creates package.json

### Step 2 — Install Required Package

Run this inside the backend folder

npm install express multer cloudinary dotenv cors

What each package does:
• express → your backend server
• multer → handles file uploads
• cloudinary → uploads images to Cloudinary
• dotenv → loads environment variables
• cors → allows your React frontend to talk to your backend

### Step 3 — Create Your Backend File Structure

Inside yogabackend/, create these files

backend/
server.js
cloudinary.js
routes/
upload.js
.env

### Step 4 — Add Cloudinary Credentials to .env

Inside backend/.env:

CLOUD_NAME=your_cloud_name
CLOUD_KEY=your_api_key
CLOUD_SECRET=your_api_secret

// will add monogoDB later

### Step 5 — Configure Cloudinary

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
cloud_name: process.env.CLOUD_NAME,
api_key: process.env.CLOUD_KEY,
api_secret: process.env.CLOUD_SECRET
});

export default cloudinary;

### Step 6 — Create the Upload Route (routes/upload.js )

### Step 7 — Create Your Express Server

### Step 8 — Test Your Backend

node server.js

You should see Server running on port 5000

### Step 9 — deploy your backend to GitHub

1: Open your backend folder in VS Code
Your folder structure should look like:

backend/
server.js
routes/
cloudinary.js
package.json
.env

2: Initialize Git inside the backend folder

git init

This creates a local Git repository.

3: Create a .gitignore file at the root

Add this:

node_modules
.env

4: Add your files to Git

git add .

5: Commit your backend cod

git commit -m "Initial backend setup"

6: Create a new GitHub repositor

Go to GitHub → New Repository
Name it something like:

Yoga-backend

7: Connect your local backend to GitHub

git remote add origin https://github.com/fang-wenlee/yoga-backend.git
git branch -M main
git push -u origin main
