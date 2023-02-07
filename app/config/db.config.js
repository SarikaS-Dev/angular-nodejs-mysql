module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Grt@2022",
    DB: "userdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };