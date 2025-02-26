const mysql = require("mysql2");
const knex = require("knex");
const config = require("../knexfile");

// MySQL connection
const mysqlDb = mysql.createConnection({
  host: "switchyard.proxy.rlwy.net",
  port: 50210,
  user: "root",
  password: "vjBhwMpKoqPjNOLzXimagOSgUtTIRYRA",
  database: "railway",
});

// Knex instance for migrations
const knexDb = knex(config.development);

// Run migrations on startup
knexDb.migrate.latest()
  .then(() => console.log("✅ Migrations applied successfully!"))
  .catch((err) => console.error("Migration error:", err));

mysqlDb.connect((err) => {
  if (err) {
    console.error("❌ MySQL Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// ✅ Export only mysqlDb
module.exports = mysqlDb;
