module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "switchyard.proxy.rlwy.net",
      port: 50210,
      user: "root",
      password: "vjBhwMpKoqPjNOLzXimagOSgUtTIRYRA",
      database: "railway",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};
