'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InventoryStat extends Model {

    static associate(models) {
      //None necessary, a joins table
    }
  }
  InventoryStat.init({
    inventoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'InventoryStat',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return InventoryStat;
};
