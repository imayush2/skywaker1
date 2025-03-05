import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";

config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 4100; // Default to 4100 if PORT is not defined

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // Local development URL
  "https://whimsical-tapioca-ce1849.netlify.app", // Production front-end URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Allow the request if origin is in the allowedOrigins list, or if there's no origin (e.g., server-side request)
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow sending of cookies (credentials)
};

app.use(cors(corsOptions)); // Apply the CORS middleware with the updated options

app.use(express.json());
app.use(cookieParser());

// Database connection
import dbConnect from "./config/mongondb.js";
dbConnect();

// API routes
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
