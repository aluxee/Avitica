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
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isIn: [['Trivial', 'Easy', 'Medium', 'Hard']]
      }

    },
    dueDate: {
      type: DataTypes.DATEONLY,

    }
  }, {
    sequelize,
    modelName: 'Task',
  });

  return Task;
};
