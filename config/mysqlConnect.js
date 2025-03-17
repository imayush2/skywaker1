import mysql from "mysql2";

// MySQL Database Connection
const mysqlConnect = mysql.createConnection({
  host: "localhost", // Your MySQL host
  user: "root", // Your MySQL username
  password: "8287447641", // Your MySQL password
  database: "Scraping_db", // Your MySQL database name
});

mysqlConnect.connect((err) => {
  if (err) {
    console.error("error connecting to MySQL:", err.stack);
    return;
  }
  console.log("connected to MySQL as id " + mysqlConnect.threadId);
});

export default mysqlConnect;
