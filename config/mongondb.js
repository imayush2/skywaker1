import mongoose from "mongoose";

import { config } from "dotenv";

config({ path: "../.env" });

const dbConnect = async () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("db connect"))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

export default dbConnect;
