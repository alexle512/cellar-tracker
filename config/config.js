// const dotenv = require("dotenv").config()

module.exports = {
  development: {
    use_env_variable: process.env.DATABASE_URL,
    database: process.env.DEV_NAME,
    username: process.env.DEV_UN,
    password: process.env.DEV_PW,
    host: process.env.DEV_HOST,
    port: process.env.DEV_PORT,
    dialect: "postgres"
  },
  productData: {
    database: process.env.PD_DB,
    username: process.env.PD_UN,
    password: process.env.PD_PW,
    host: process.env.PD_HOST,
    port: process.env.PD_PORT,
    dialect: "postgres"
  }
}
