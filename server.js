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
  origin: "http://localhost:3000", // Change this to the correct frontend URL
  credentials: true, // Allow cookies to be sent
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); // Apply the CORS middleware with the updated options

// Database connection
import dbConnect from "./config/mongondb.js";
// import mysqlConnect from "./config/mysqlConnect.js";
dbConnect();
// mysqlConnect;

// API endpoints
app.get("/", (req, res) => {
  res.send("this is home page.");
});

// // Example route to fetch data from MySQL
// app.get("/api/data", (req, res) => {
//   const query = "SELECT * FROM your_table_name"; // Replace with your MySQL table name
//   mysqlConnect.query(query, (err, results) => {
//     if (err) {
//       res.status(500).json({ error: "Failed to retrieve data from MySQL" });
//     } else {
//       res.json(results); // Send MySQL data as JSON
//     }
//   });
// });

app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
