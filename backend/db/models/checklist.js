'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Checklist.belongsTo(models.Task, {
        foreignKey: 'taskId'
      })
    }
  }
  Checklist.init({
    taskId: {
      type: DataTypes.INTEGER
    },
    checklistItem: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50]
      }
    },
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'Checklist',
  });
  return Checklist;
};
