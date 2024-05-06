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
    faceType: {
      type: DataTypes.STRING,
      allowNull: false
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
    earType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Human', 'Elven']]
      }
    },
    skinType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Dark', 'Tanned', 'Clay', 'Light', 'Ashen']]
      }
    },
    hairType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expression: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Avatar',
  });
  return Avatar;
};
