  'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {

    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Task.hasOne(models.Checklist, {
        foreignKey: 'taskId'
      })
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50]
      }
    },
    notes: {
      type: DataTypes.TEXT,

    },
    userId: {
      type: DataTypes.INTEGER,

    },
    difficulty: {
      type: DataTypes.STRING,

    },
    dueDate: {
      type: DataTypes.DATE(6),

    }
  }, {
    sequelize,
    modelName: 'Task',
  });

  return Task;
};
