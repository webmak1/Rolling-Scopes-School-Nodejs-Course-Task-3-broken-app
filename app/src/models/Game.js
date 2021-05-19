const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const attributes = {
  title: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },

  ownerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  studio: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  esrbRating: {
    type: Sequelize.CHAR(5),
    allowNull: false,
  },

  userRating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },

  havePlayed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
};

const Game = sequelize.define('Games', attributes);

exports.Game = Game;
