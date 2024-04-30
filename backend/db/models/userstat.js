'use strict';
const {
  Model
} = require('sequelize');

const { User } = require('./user');
module.exports = (sequelize, DataTypes) => {
  class userStat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // a joins table hybrid with seeded columns thus no ref will be involved in the model
    }

    // Method to calculate default hp based on level
    static calcDefaultHealth(level) {
      return level === 1 ? 50 : Math.max(Math.round(50 * (level - 1) * 2.5));
    }

    // Method to calculate default experience based on level
    static calcDefaultExperience(level) {
      return level === 1 ? 100 : Math.max(Math.round(((level - 1) * 25) * ((level - 1) * 1.25)), 0); // 2 = 125, 3 = 187, 5 = 500
    }

    // Method to calculate level dynamically based on amt of exp points
    static getLevel(experience) {
      // Calculate level based on total experience
      let level = 1;
      let totalExp = experience;

      while (totalExp >= Math.round(Math.max(((level - 1) * 25)) * ((level - 1) * 1.25)) && level < 5) {
        level++;
        totalExp -= Math.round(Math.max(((level - 1) * 25) * ((level - 1) * 1.25)))
      }
      return level;
    }

    static async setDefaultStats(user, heroClass) {
      let stats;

      if (heroClass === 'Warrior') {
        stats = await User.findOne({ where: { class: 'Warrior' } });
      } else if (heroClass === 'Mage') {
        stats = await User.findOne({ where: { class: 'Mage' } });
      } else {
        throw new Error('Invalid hero class');
      }

      if (!stats) {
        throw new Error('Default stats for hero class not found');
      }

      // Update userStat with default stats
      await userStat.upsert({
        userId: user.id,
        health: stats.health,
        experience: user.experience || 0,
        level: this.getLevel(user.experience || 0),
        gold: user.gold || 0
      });
    }

    async calcHpAndExp(completed) {
      const currLevel = this.level;
      let expGain;
      let goldGain;

      // Increase gained exp points per task per level
      if (completed) {
        expGain = Math.max(10, 50 - (currLevel - 1) * 5);
        goldGain = Math.max(10, 85 + (currLevel - 1) * 12);
        this.experience += expGain;
        this.gold += goldGain;
      } else {
        const healthLoss = Math.ceil(12 * (currLevel * 0.75));
        this.health -= healthLoss;
      }

      // If health drops below 0, reset to default hp based on level
      if (this.health <= 0) {
        this.health = userStat.calcDefaultHealth(currLevel); // Reset hp to default based on level
        // Reset exp to default based on level
        this.experience = userStat.calcDefaultExperience(currLevel);
      }

      return expGain;
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
      defaultValue: 50 // default health amt starting at level 1
    },
    experience: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    gold: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'userStat',
  });

  return userStat;
};
