import { Sequelize } from "sequelize";
import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const db = knex({
  client: "mysql2", // or "mysql"
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

// Set up the Sequelize instance
export const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    port: process.env.DB_PORT, // Database port
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: process.env.SSL_MODE === "REQUIRED", // Only enable SSL if required
        rejectUnauthorized: false, // Accept unverified SSL certificates (can be changed for production)
      },
      connectTimeout: 30000, // Increase connection timeout to 30 seconds
    },
    logging: false, // Disable SQL query logging (optional)
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, // Time (in ms) before a connection is considered unavailable
      idle: 10000, // Time (in ms) before a connection is released if unused
    },
  }
);

// Test the connection
export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

export default db;
