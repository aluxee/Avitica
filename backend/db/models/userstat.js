'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userStat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userStat.belongsTo(models.User)
      userStat.belongsTo(models.Stat)
      // both a belongsTo : belongsToMany for flexibility of model as it is kind of simultaneously a one to many and many to many relationship for both tables depending on perspective of clientele
    }
  }
  userStat.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    health: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    experience: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    statId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'userStat',
  });
  return userStat;
};
