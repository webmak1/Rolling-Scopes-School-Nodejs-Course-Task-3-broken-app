require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

module.exports = async (req, res, next) => {
  try {
    const sessionToken = req.headers.authorization;

    if (!sessionToken) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .send({ auth: false, message: 'No token provided.' });
    }

    const decoded = await jwt.verify(sessionToken, process.env.JWT_SECRET_KEY);

    if (decoded) {
      console.log(decoded);

      await User.sync();
      const user = await User.findOne({ where: { id: decoded.id } });

      if (!user) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send({ error: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
      }
      req.body.user = user;
      next();
    }
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ error: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
  }
};
