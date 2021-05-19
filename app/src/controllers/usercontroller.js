require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const User = require('../db');
const { User } = require('../models/User');

// SIGNUP
router.post('/signup', async (req, res) => {
  console.log('SIGNUP');

  const { fullName, userName, password, email } = req.body;
  const passwordHash = await bcrypt.hashSync(password, 10);

  try {
    await User.sync({ force: true });
    const createdUser = await User.create({
      fullName,
      userName,
      passwordHash,
      email,
    });

    const token = await jwt.sign(
      { id: createdUser.id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    return res.status(200).json({
      user: createdUser,
      token,
    });
  } catch (err) {
    console.log('err');
    console.log(err);
    return res.status(500).send({ err: 'ERROR' });
  }
});

router.post('/signin', (req, res) => {
  console.log('SIGNIN');

  const { userName, password } = req.body;
  console.log(userName, password);

  User.findOne({ where: { userName: userName } }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.passwordHash, function (_err, matches) {
        if (matches) {
          const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
            expiresIn: 60 * 60 * 24,
          });
          return res.json({
            user: user,
            message: 'Successfully authenticated.',
            sessionToken: token,
          });
        } else {
          return res.status(502).send({ error: 'Passwords do not match.' });
        }
      });
    } else {
      return res.status(403).send({ error: 'User not found.' });
    }
  });
});

module.exports = router;
