'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {

    static associate(models) {
      Inventory.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Inventory.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 250]
      }
    }
  }, {
    sequelize,
    modelName: 'Inventory',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Inventory;
};
