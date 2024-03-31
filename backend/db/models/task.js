  'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
        constraints: false
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
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completed: DataTypes.BOOLEAN,
    difficulty: {
      type: DataTypes.STRING,
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
