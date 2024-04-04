'use strict';
const { Shop } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const resHpPotion = await fetch('https://api.maplestory.net/item/2000000')
    const dataHpPotion = await resHpPotion.json()
    const resDrgRg = await fetch('https://api.maplestory.net/item/1232010'); // Dragon Rage
    const dataDrgRg = await resDrgRg.json()
    const resCrim = await fetch('https://api.maplestory.net/item/1232034'); //Imperial Crimson Zodiac
    const dataCrim = await resCrim.json()
    const otherPotion = await fetch('https://api.maplestory.net/item/2000030')
    const dataOtherPotion = await otherPotion.json()
    const resMeiRod = await fetch('https://api.maplestory.net/item/1212077'); //Meister Thanatos
    const dataMeiRod = await resMeiRod.json()
    const resAmeRod = await fetch('https://api.maplestory.net/item/1232034'); //Ame-no-Uzume's Shining Rod
    const dataAmeRod = await resAmeRod.json()
    const resFirstShield = await fetch('https://api.maplestory.net/item/1092070'); //1st Unwelcome Guest Magician Shield
    const dataFirstShield = await resFirstShield.json()
    const resSoulShield = await fetch('https://api.maplestory.net/item/1098000'); //Soul Shield of Protection
    const dataSoulShield = await resSoulShield.json()
    //magic robe: Count Dracula Cape, Black Split Piece, Blue Lolico Pants, White Fingerless Gloves, Black Santa Boots
    //plad armor: Transparent Cape, Silver Master Sergeant, Shine Rider Pants, Skull Gloves, Black Shoes of Death



    await Shop.bulkCreate([
      {
        itemName: `${dataHpPotion.name}`,
        description: `${dataHpPotion.description}`,
        gold: 50,
        itemIcon: 'https://api.maplestory.net/item/2000000/icon',
      },
      {
        itemName: `Power Muffin's ${dataOtherPotion.name}`,
        description: `Grants a 10% boost in strength (STR).`,
        gold: 75,
        itemIcon: 'https://api.maplestory.net/item/2002004/icon',
      },
      {
        itemName: `Magic Jello's ${dataOtherPotion.name}`,
        description: `Grants a 10% boost in magic (MAGIC).`,
        gold: 75,
        itemIcon: 'https://api.maplestory.net/item/2002003/icon',
      },
      {
        itemName: `Lucky Farms: ${dataOtherPotion.name}`,
        description: 'Grants a 10% increase in luck (LUCK).',
        gold: 85,
        itemIcon: 'https://api.maplestory.net/item/2000054/icon',
      },
      {
        itemName: 'Plad Armor',
        description: 'Grants a 20% increase in physical defense (PDEF): Shiny rich armor of steel.',
        gold: 200,
        itemIcon: 'https://api.maplestory.net/item/1052075/icon'
      },
      {
        itemName: 'Magic Robe',
        description: 'Grants a 20% increase in magic defense (MDEF): A magical silk threaded robe.',
        gold: 200,
        itemIcon: 'https://api.maplestory.net/item/1052315/icon'
      },
      {
        itemName: 'Dragon`s Fury',
        description: `Grants 20% increase in overall strength (STR): ${dataDrgRg.description}.`,
        gold: 250,
        itemIcon: 'https://api.maplestory.net/item/1232010/icon'
      },
      {
        itemName: `${dataCrim.name}`,
        description: 'Grants a 20% increase in strength (STR): Carved from the cave walls of the Deep.',
        gold: 250,
        itemIcon: 'https://api.maplestory.net/item/1232034/icon'
      },
      {
        itemName: `${dataSoulShield.name}`,
        description: `Grants a 10% increase in physical defense (PDEF): Pure diamonds that capture the blink of the noon sun.`,
        gold: 275,
        itemIcon: 'https://api.maplestory.net/item/1098000/icon'
      },
      {
        itemName: `${dataFirstShield.name}`,
        description: `Grants a 10% increase in magical defense (MDEF): Collected by the magic of elves deep within the magic forest.`,
        gold: 275,
        itemIcon: 'https://api.maplestory.net/item/1092070/icon'
      },
      {
        itemName: `${dataAmeRod.name}`,
        description: 'Grants a 20% increase in magic (MAGIC): Exquisite fashionable  gold and diamond embedded rod from the deep of Fairy Kingdoms.',
        gold: 250,
        itemIcon: 'https://api.maplestory.net/item/1212057/icon'
      },
      {
        itemName: `${dataMeiRod.name}`,
        description: 'Grants a 20% increase in magic (MAGIC): Exquisite stylish embedded platinum rod.',
        gold: 250,
        itemIcon: 'https://api.maplestory.net/item/1212077/icon'
      },
    ], options, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Shops';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      gold: {
        [Op.in]: [50, 75, 85, 200, 250, 275]
      }
    }, {});
  }
};
