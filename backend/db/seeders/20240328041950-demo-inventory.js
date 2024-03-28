'use strict';
const { Inventory } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Inventory.bulkCreate([
      {
        userId: 1,
        itemName: 'Hi-Potion',
        description: 'Restores 40% of your total health'
      },
      {
        userId: 1,
        itemName: 'Power Muffin',
        description: 'Grants a 10% boost in strength'
      },
      {
        userId: 1,
        itemName: 'Magic Jello',
        description: 'Grants a 10% boost in magic'
      },
      {
        userId: 2,
        itemName: 'Extremely Hard Tater-Tot',
        description: 'Grants a 10% boost in defense'
      },
      {
        userId: 2,
        itemName: 'Lucky Farms',
        description: 'Grants a 10% increase in luck'
      },
      {
        userId: 3,
        itemName: 'Hi-Potion',
        description: 'Restores 40% of your total health'
      },
      {
        userId: 3,
        itemName: 'Hi-Potion',
        description: 'Restores 40% of your total health'
      },
    ], options, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Inventories';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1, 2, 3]
      }
    }, {});
  }
};
