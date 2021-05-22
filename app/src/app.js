const express = require('express');
const user = require('./controllers/userController');
const game = require('./controllers/gameController');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/auth', user);
app.use(require('./middleware/validateSession'));
app.use('/api/game', game);

const APP_PORT = process.env.APP_APP_PORT || 4000;

app.listen(APP_PORT, () =>
  console.log(`App is running on http://localhost:${APP_PORT}`)
);
