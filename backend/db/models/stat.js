'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stat.belongsToMany(models.Inventory, {
        through: models.InventoryStat,
        foreignKey: 'statId',
        otherKey: 'inventoryId'
      }); // a many to many relationship with Inventory


      Stat.belongsToMany(models.User, {
        through: models.userStat,
        foreignKey: 'userId',
        otherKey: 'statId'
      }); // a many to many relationship with Inventory
    }
  }
  Stat.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isIn: [['LUCK', 'STR', 'MAGIC', 'PDEF', 'MDEF', 'HP']]
      }
    }
  }, {
    sequelize,
    modelName: 'Stat',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Stat;
};
