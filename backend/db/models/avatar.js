'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Avatar.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Avatar.init({
    faceName: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    ears: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['humanEars', 'bigEars']]

      }
    },
    skin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['dark', 'tanned', 'clay', 'light', 'ashen']]
      }
    },
    hairName: {
      type: DataTypes.STRING
    },
    hairId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    faceId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    character: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Avatar',
  });
  return Avatar;
};
