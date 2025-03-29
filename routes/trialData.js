import express from "express";
import { trialData } from "../controllers/trialData.js";

const trialData = express.Router();

trialData.get("/clinical-trials", trialData);

export default trialData;
