'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [6, 20],
        hasNoSymbols(value) {
          if (value == '!@#$%^&*(){}_-+=[]{}:;"' || value == "<,>.?/'") {
            throw new Error('Username cannot contain any symbols')
          }
        },
        isNotEmail(value) {
          Validator.isEmail(value) ? (function
            () {
            throw new Error('Username cannot be an email')
          }()) : ''
        }
      }
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 30],
        isAlpha: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 250],
        isEmail: true
      }

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['email', 'password', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};
