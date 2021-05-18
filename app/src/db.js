const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  }
);

// const sequelize = new Sequelize('postgres://postgres:pass123@localhost/', {
//   dialect: 'postgres',
//   // anything else you want to pass
// });

console.log('process.env.DATABASE_USER');
console.log(process.env.DATABASE_USER);

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   })
//   .finally(() => {
//     console.log('Connection closed.');
//     sequelize.close();
//   });

exports.sequelize = sequelize;

// const Sequelize = require('sequelize');
// require('dotenv').config();

// //database userName   password
// const sequelize = new Sequelize(
// process.env.DATABASE_NAME,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: process.env.DATABASE_HOST,
//     dialect: 'postgres',
//   };
// );

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   })
//   .finally(() => {
//     console.log('Connection closed.');
//     sequelize.close();
//   });

// module.exports = sequelize;
