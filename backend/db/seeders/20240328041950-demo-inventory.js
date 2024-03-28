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
        statId: 6,
        itemName: 'Hi-Potion',
        itemType: true,
        description: 'Restores 40% of your total health',
        healthBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 1,
        statId: 2,
        itemName: 'Power Muffin',
        description: 'Grants a 10% boost in strength',
        statBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 1,
        statId: 3,
        itemName: 'Magic Jello',
        description: 'Grants a 10% boost in magic',
        statBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 1,
        statId: 4,
        itemName: 'Plad Armor',
        description: 'Shiny rich armor that provides a 20% increase in physical defense',
        statBoost: true,
        gear: true,
        wep: false,
        equipped: true
      },
      {
        userId: 1,
        statId: 2,
        itemName: 'Dragon`s Fury',
        description: 'Made from the breathes of rare formidable dragons, this sword provides a 20% increase in strength',
        statBoost: true,
        gear: false,
        wep: true,
        equipped: true
      },
      {
        userId: 2,
        statId: 4,
        itemName: 'Extremely Hard Tater-Tot',
        description: 'Grants a 10% boost in both physical defense',
        statBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 2,
        statId: 1,
        itemName: 'Lucky Farms',
        description: 'Grants a 10% increase in luck',
        statBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 2,
        statId: 5,
        itemName: 'Magic Robe',
        description: 'A magical silk threaded robe that grants a 10% boost in magical defense',
        statBoost: true,
        gear: true,
        wep: false
      },
      {
        userId: 2,
        statId: 6,
        itemName: 'Hi-Potion',
        description: 'Restores 40% of your total health',
        healthBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 2,
        statId: 3,
        itemName: 'Ame`s Uzu Rod',
        description: 'Exquisite fashionable embedded gold rod, this wand provides a 20% increase in magic',
        statBoost: true,
        gear: false,
        wep: true,
        equipped: true
      },
      {
        userId: 2,
        statId: 3,
        itemName: 'Ame`s Uzu Rod',
        description: 'Exquisite fashionable embedded platinum rod, this wand provides a 20% increase in magic',
        statBoost: true,
        gear: false,
        wep: true,
        equipped: false
      },
      {
        userId: 3,
        statId: 6,
        itemName: 'Hi-Potion',
        description: 'Restores 40% of your total health',
        healthBoost: true,
        gear: false,
        wep: false
      },
      {
        userId: 3,
        statId: 4,
        itemName: 'Plad Armor',
        description: 'Shiny rich armor that provides a 20% increase in physical defense',
        statBoost: true,
        gear: true,
        wep: false
      },
      {
        userId: 3,
        statId: 2,
        itemName: 'Crimson Zodiac',
        description: 'Carved from the cave walls of the Deep, this sword provides a 20% increase in strength',
        statBoost: true,
        gear: false,
        wep: true,
        equipped: true
      },
      {
        userId: 3,
        statId: 4,
        itemName: 'Soul Shield of Light Shield',
        description: 'Pure diamonds that capture the blink of the noon sun, this shield provides a 10% increase in physical defense',
        statBoost: true,
        gear: false,
        wep: true,
        equipped: false
      },
      {
        userId: 3,
        statId: 5,
        itemName: 'Unwelcome Guest Shield',
        description: 'Collected by the magic of elves deep within the magic forest, this shield provides a 10% increase in magical defense',
        statBoost: true,
        gear: false,
        wep: true,
        equipped: true
      },
      {
        userId: 1,
        statId: 5,
        itemName: 'Unwelcome Guest Shield',
        description: 'Collected by the magic of elves deep within the magic forest, this shield provides a 10% increase in magical defense',
        statBoost: true,
        gear: false,
        wep: true,
        equipped: false
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
