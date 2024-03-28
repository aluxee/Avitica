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
        description: 'Restores 40% of your total health',
        healthBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 1,
        itemName: 'Power Muffin',
        description: 'Grants a 10% boost in strength',
        statBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 1,
        itemName: 'Magic Jello',
        description: 'Grants a 10% boost in magic',
        statBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 1,
        itemName: 'Plad Armor',
        description: 'Shiny rich armor that provides a 20% increase in defense',
        statBoost: true,
        gear: true,
        wep: false,
        equipped: true
      },
      {
        userId: 1,
        itemName: 'Dragon`s Fury',
        description: 'Made from the breathes of rare formidable dragons, this sword provides a 20% increase in strength',
        statBoost: true,
        gear: false,
        wep: true,
        equipped: true
      },
      {
        userId: 2,
        itemName: 'Extremely Hard Tater-Tot',
        description: 'Grants a 10% boost in defense',
        statBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 2,
        itemName: 'Lucky Farms',
        description: 'Grants a 10% increase in luck',
        statBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 2,
        itemName: 'Magic Robe',
        description: 'A magical silk threaded robe that grants a 10% boost in defense',
        statBoost: true,
        gear: true,
        wep: false
      },
      {
        userId: 2,
        itemName: 'Hi-Potion',
        description: 'Restores 40% of your total health',
        healthBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 2,
        itemName: 'Ame`s Uzu Rod',
        description: 'Exquisite fashionable embedded gold rod, this wand provides a 20% increase in magic',
        statBoost: true,
        gear: false,
        wep: true,
        equipped: true
      },
      {
        userId: 2,
        itemName: 'Ame`s Uzu Rod',
        description: 'Exquisite fashionable embedded platinum rod, this wand provides a 20% increase in magic',
        statBoost: true,
        gear: false,
        wep: true,
        equipped: false
      },
      {
        userId: 3,
        itemName: 'Hi-Potion',
        description: 'Restores 40% of your total health',
        healthBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 3,
        itemName: 'Plad Armor',
        description: 'Shiny rich armor that provides a 20% increase in defense',
        statBoost: true,
        gear: true,
        wep: false
      },
      {
        userId: 3,
        itemName: 'Crimson Zodiac',
        description: 'Carved from the cave walls of the Deep, this sword provides a 20% increase in strength',
        statBoost: true,
        gear: false,
        wep: true,
        equipped: true
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
