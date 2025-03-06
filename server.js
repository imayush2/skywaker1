import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";

config({ path: "./.env" });

const app = express();
const port = process.env.PORT;

// Update CORS configuration
const corsOptions = {
  origin:
    "https://67c93c87cd6825b9cf668e4b--beautiful-faloodeh-fb0219.netlify.app", // Change this to the correct frontend URL
  credentials: true, // Allow cookies to be sent
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); // Apply the CORS middleware with the updated options

// Database connection
import dbConnect from "./config/mongondb.js";
dbConnect();

// API endpoints
app.get("/", (req, res) => {
  res.send("this is home page.");
});
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
