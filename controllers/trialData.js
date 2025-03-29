import db from "../config/dbConnect.js";

export const trialData = async (req, res) => {
  try {
    // Call the stored procedure
    const trials = await db.raw("CALL GetClinicalTrialsData()");

    // Send the data as a response
    res.json(trials[0]); // The first element contains the result set
  } catch (error) {
    console.error("Error fetching clinical trials data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
