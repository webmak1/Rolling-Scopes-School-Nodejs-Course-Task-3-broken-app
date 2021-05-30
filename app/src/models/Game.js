const DataTypes = require('sequelize');
const { sequelize } = require('../db');

const attributes = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  ownerId: {
    allowNull: false,
    type: DataTypes.UUID,
    allowNull: false,
  },
  studio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  esrbRating: {
    type: DataTypes.CHAR(5),
    allowNull: false,
  },
  userRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  havePlayed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
};

const Game = sequelize.define('Games', attributes);

exports.Game = Game;
