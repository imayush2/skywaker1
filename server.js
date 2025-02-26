import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";

config({ path: "./.env" });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

//db connection
import dbConnect from "./config/mongondb.js";
dbConnect();

//Api end points
app.get("/", (req, res) => {
  res.send("this is home page.");
});
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`server is listng ${port}`);
});
