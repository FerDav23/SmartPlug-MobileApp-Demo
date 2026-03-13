const pool = require("../config/db");
const bcrypt = require('bcrypt');
 const checkTables = async () => {
      try {
        const result = await pool.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
        //"SELECT current_database() FROM pg_stat_activity WHERE pid = pg_backend_pid()"
        );
        console.log(result);
      } catch (error) {
        console.error("Error checking tables:", error);
        throw error;
      }
    };

const User = {
  create: async (email, passwordHash) => {
    console.log("Creating user:", email, passwordHash);
    try {
      //await checkTables();
      
      const result = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, passwordHash]
      );
      
      return result;
   

    // Example usage of checkTables function
    //const tables = await checkTables();
    //console.log("Tables in the database:", tables);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  findByEmail: async (email) => {
    return pool.query("SELECT * FROM users WHERE email = $1", [email]);
  },

  findByPk: async (id) => {
    try {
      const result = await pool.query(
        "SELECT user_id, email FROM users WHERE user_id = $1",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = User;
