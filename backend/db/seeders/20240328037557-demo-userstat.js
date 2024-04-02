'use strict';
const { userStat } = require('../models');
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {

  async up(queryInterface, Sequelize) {

    await userStat.bulkCreate([
      {
        userId: 1,
        health: 50,
        experience: 100,
        gold: 1000
      },
      {
        userId: 2,
        health: 125,
        experience: 187,
        gold: 3000
      },
      {
        userId: 3,
        health: 210,
        experience: 500,
        gold: 5000
      },
    ], options, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'userStats';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1, 2, 3]
      }
    }, {});
  }
};
