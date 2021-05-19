const express = require('express');
// const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
// const Sequelize = require('sequelize');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/auth', user);
app.use(require('./middleware/validate-session'));
app.use('/api/game', game);

const APP_PORT = process.env.APP_APP_PORT || 4000;

app.listen(APP_PORT, () =>
  console.log(`App is running on http://localhost:${APP_PORT}`)
);
