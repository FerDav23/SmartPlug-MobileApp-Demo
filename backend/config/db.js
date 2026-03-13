const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,       // 'postgres'
  host: process.env.DB_HOST,       // 'localhost'
  database: process.env.DB_NAME,   // 'smartHome'
  password: process.env.DB_PASS,   // 'Janeth0914'
  port: process.env.DB_PORT,       // 5432
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection failed", err.stack);
  } else {
    console.log("✅ Connected to PostgreSQL database:", process.env.DB_NAME);
    release(); // Release the client back to the pool
  }
});

module.exports = pool;
