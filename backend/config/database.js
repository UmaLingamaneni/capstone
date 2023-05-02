var connection = {
  server: "uma-ualr-capstone.database.windows.net",
  port: 1433,
  user: "admin_2023",
  password: "umacapstone@123",
  database: "Covid_Database",
  multipleStatements: true,
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
  requestTimeout: 99999999,
  pool: {
    max: 1000,
    min: 0,
    idleTimeoutMillis: 60000,
  },
};

module.exports = connection;
