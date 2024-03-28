'use strict';
const { Stat } = require('../models');
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await Stat.bulkCreate([
      {
        type: 'LUCK'
      },
      {
        type: 'STR'
      },
      {
        type: 'MAGIC'
      },
      {
        type: 'PDEF'
      },
      {
        type: 'MDEF'
      },
      {
        type: 'HP'
      },
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Stats';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      type: {
        [Op.in]: ['LUCK', 'STR', 'MAGIC', 'PDEF', 'MDEF', 'HP']
      }
    }, {});
  }
};
