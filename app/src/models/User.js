const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const attributes = {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  passwordHash: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
};

const User = sequelize.define('Users', attributes);

exports.User = User;
