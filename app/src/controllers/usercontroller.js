const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const User = require('../db');
const { User } = require('../models/User');

// SIGNUP
router.post('/signup', async (req, res) => {
  // router.route('/signup').post((req, res) => {
  console.log('SIGNUP');

  const { fullName, userName, password, email } = req.body;
  // console.log(fullName, userName, password, email);

  const passwordHash = await bcrypt.hashSync(password, 10);
  // console.log('passwordHash');
  // console.log(passwordHash);

  try {
    await User.sync({ force: true });
    const createdUser = await User.create({
      fullName,
      userName,
      passwordHash,
      email,
    });

    // console.log('createdUser1');
    // console.log(createdUser);

    const token = await jwt.sign(
      { id: createdUser.id },
      'lets_play_sum_games_man',
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    // console.log('createdUser2');
    // console.log(createdUser);

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

//   User.create({
//     fullName,
//     userName,
//     passwordHash: bcrypt.hashSync(password, 10),
//     email: email,
//   }).then(
//     function signupSuccess(user) {
//       let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
//         expiresIn: 60 * 60 * 24,
//       });
//       res.status(200).json({
//         user: user,
//         token: token,
//       });
//     },

//     function signupFail(err) {
//       res.status(500).send(err.message);
//     }
//   );
// });

router.post('/signin', (req, res) => {
  console.log('SIGNIN');

  const { userName, password } = req.body;
  console.log(userName, password);

  User.findOne({ where: { userName: userName } }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.passwordHash, function (err, matches) {
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
