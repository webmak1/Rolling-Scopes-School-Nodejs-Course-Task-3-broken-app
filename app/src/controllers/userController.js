require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const { User } = require('../models/User');

// SIGNUP
router.post('/signup', async (req, res) => {
  console.log('SIGNUP');

  const { fullName, userName, password, email } = req.body;
  const passwordHash = await bcrypt.hashSync(password, 10);

  try {
    await User.sync();
    const createdUser = await User.create({
      fullName,
      userName,
      passwordHash,
      email,
    });

    return res.status(StatusCodes.CREATED).json({
      message: `User ${createdUser.userName} successfully created!`,
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ err: err.message });
  }
});

router.post('/signin', (req, res) => {
  console.log('SIGNIN');

  const { userName, password } = req.body;

  User.findOne({ where: { userName: userName } }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.passwordHash, function (_err, matches) {
        if (matches) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: 60 * 60 * 24,
          });
          return res.json({
            token,
          });
        } else {
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .send({ error: 'Passwords do not match.' });
        }
      });
    } else {
      return res
        .status(StatusCodes.FORBIDDEN)
        .send({ error: 'User not found.' });
    }
  });
});

module.exports = router;
