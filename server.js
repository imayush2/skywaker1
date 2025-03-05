import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";

config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 4100; // Default to 4100 if PORT is not defined

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Specify the frontend's URL
  credentials: true, // Allow sending of cookies (credentials)
};

app.use(cors(corsOptions)); // Apply the CORS middleware with the options

app.use(express.json());
app.use(cookieParser());

// Database connection
import dbConnect from "./config/mongondb.js";
dbConnect();

// API routes
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
