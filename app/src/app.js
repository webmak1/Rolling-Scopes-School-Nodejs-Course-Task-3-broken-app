const express = require('express');
const app = express();
// const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');

// db.sync();
app.use(require('body-parser'));
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'));
app.use('/api/game', game);
// app.listen(function () {
//   console.log('App is listening on 4000');
// });

const APP_PORT = process.env.APP_APP_PORT || 4000;

app.listen(APP_PORT, () =>
  console.log(`App is running on http://localhost:${APP_PORT}`)
);
