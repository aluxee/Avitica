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
      // Stat.belongsToMany(models.Inventory, {
      //   through: models.InventoryStat,
      //   foreignKey: 'id',
      //   otherKey: 'inventoryId'
      // }); // a many to many relationship with Inventory
      Stat.belongsTo(models.Inventory, {
        foreignKey: 'id'
      })

      Stat.belongsToMany(models.User, {
        through: models.userStat,
        otherKey: 'userId',
        foreignKey: 'userId'
      }); // a many to many relationship with Inventory
    }
  }
  Stat.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    strength: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    magic: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    physicalDefense: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    magicDefense: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    luck: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
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
