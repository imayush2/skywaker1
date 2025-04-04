import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js"; // Import the auth routes
import { dbConnect } from "./config/dbConnect.js"; // Import the dbConnect function
import { trialData } from "./controllers/trialData.js";

config(); // Load environment variables from .env file

const app = express();
const port = 5001; // Use process.env.PORT or default to 5000 if not set

// Apply CORS settings
const corsOptions = {
  origin: "http://localhost:3000", // Change this to the actual frontend URL
  credentials: true, // Allow sending cookies with requests
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
};

app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies from incoming requests
app.use(cors(corsOptions)); // Apply CORS middleware with the defined options

// Call dbConnect function to connect to MySQL database
dbConnect();

// Home route (for testing)
app.get("/", (req, res) => {
  res.send("This is the home page.");
});

// Use the auth routes for handling authentication
app.use("/api/auth", authRoute);
app.use("/api/trial", trialData);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
