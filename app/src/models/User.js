const DataTypes = require('sequelize');
const { sequelize } = require('../db');

const attributes = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    validate: {
      isEmail: true,
    },
  },
};

const User = sequelize.define('Users', attributes);

exports.User = User;
