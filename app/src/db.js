const Sequelize = require('sequelize');
require('dotenv').config();
//database username   password
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  }
);

sequelize.authenticate().then(
  function success() {
    console.log('Connected to DB');
  },

  function fail(err) {
    console.log(`Error: ${err}`);
  }
);
