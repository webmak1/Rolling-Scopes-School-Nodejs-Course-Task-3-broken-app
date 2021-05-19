require('dotenv').config();
const jwt = require('jsonwebtoken');
// const User = require('sequelize').import('../models/user');
// const User = require('../models/User');
const { User } = require('../models/User');

module.exports = function (req, res, next) {
  if (req.method == 'OPTIONS') {
    next(); // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;
    if (!sessionToken)
      return res
        .status(403)
        .send({ auth: false, message: 'No token provided.' });
    else {
      jwt.verify(
        sessionToken,
        process.env.JWT_SECRET_KEY,
        async (err, decoded) => {
          if (decoded) {
            try {
              // await User.sync({ force: true });
              const user = await User.findOne({ where: { id: decoded.id } });

              if (!user) {
                return res.status(401).send({ error: 'not authorized' });
              }
              req.body.user = user;
              next();
            } catch (error) {
              return res.status(401).send({ error: 'not authorized' });
            }
          } else {
            return res.status(400).send({ error: 'not authorized' });
          }
        }
      );
    }
  }
};
