const express = require('express');
// const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
// const Sequelize = require('sequelize');
require('dotenv').config();

const app = express();
app.use(express.json());

// db.sync();

// db.sync()
//   .then(() => {
//     console.log('New table created');
//   })
//   .finally(() => {
//     db.close();
//   });

// const sequelize = new Sequelize(
//   process.env.DATABASE_NAME,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: process.env.DATABASE_HOST,
//     dialect: 'postgres',
//   }
// );

// // connect to DB
// async function connect() {
//   console.log('Checking database connection...');
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     process.exit(1);
//   }
// }

// connect();

// db.sync();

app.use('/api/auth', user);
app.use(require('./middleware/validate-session'));
app.use('/api/game', game);

const APP_PORT = process.env.APP_APP_PORT || 4000;

app.listen(APP_PORT, () =>
  console.log(`App is running on http://localhost:${APP_PORT}`)
);
