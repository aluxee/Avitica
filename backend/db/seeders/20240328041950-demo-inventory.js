'use strict';
const { Inventory } = require('../models');

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
    await Inventory.bulkCreate([
      {
        userId: 1,
        shopId: 1,
        itemName: `${dataHpPotion.name}`,
        itemType: true,
        healthBoost: true,
        gear: false,
        wep: false,
      },
      {
        userId: 1,
        shopId: 2,
        itemName: `Power Muffin's ${dataOtherPotion.name}`,
        statBoost: true,
        gear: false,
        wep: false,
      },
      {
        userId: 1,
        shopId: 3,
        itemName: `Magic Jello's ${dataOtherPotion.name}`,
        statBoost: true,
        gear: false,
        wep: false,
      },
      {
        userId: 1,
        shopId: 5,
        itemName: 'Plad Armor',
        statBoost: true,
        gear: true,
        wep: false,
        equipped: true,
      },
      {
        userId: 1,
        shopId: 7,
        itemName: `${dataDrgRg.name}`,
        statBoost: true,
        gear: false,
        wep: true,
        equipped: true,
      },
      {
        userId: 2,
        shopId: 4,
        itemName: `Lucky Farms: ${dataOtherPotion.name}`,
        statBoost: true,
        gear: false,
        wep: false,
      },
      {
        userId: 2,
        shopId: 6,
        itemName: 'Magic Robe',
        statBoost: true,
        gear: true,
        wep: false,
      },
      {
        userId: 2,
        shopId: 1,
        itemName: `${dataHpPotion.name}`,
        healthBoost: true,
        gear: false,
        wep: false,
      },
      {
        userId: 2,
        shopId: 11,
        itemName: `${dataAmeRod.name}`,
        statBoost: true,
        gear: false,
        wep: true,
        equipped: true,
      },
      {
        userId: 2,
        shopId: 12,
        itemName: `${dataMeiRod.name}`,
        statBoost: true,
        gear: false,
        wep: true,
        equipped: false,
      },
      {
        userId: 3,
        shopId: 1,
        itemName: `${dataHpPotion.name}`,
        healthBoost: true,
        gear: false,
        wep: false,
      },
      {
        userId: 3,
        shopId: 5,
        itemName: 'Plad Armor',
        statBoost: true,
        gear: true,
        wep: false,
      },
      {
        userId: 3,
        shopId: 8,
        itemName: `${dataCrim.name}`,
        statBoost: true,
        gear: false,
        wep: true,
        equipped: true,
      },
      {
        userId: 3,
        shopId: 9,
        itemName: `${dataSoulShield.name}`,
        statBoost: true,
        gear: false,
        wep: true,
        equipped: false,
      },
      {
        userId: 3,
        shopId: 10,
        itemName: `${dataFirstShield.name}`,
        statBoost: true,
        gear: false,
        wep: true,
        equipped: true,
      },
      {
        userId: 2,
        shopId: 10,
        itemName: `${dataFirstShield.name}`,
        statBoost: true,
        gear: false,
        wep: true,
        equipped: true,
      },
      {
        userId: 1,
        shopId: 10,
        itemName: `${dataFirstShield.name}`,
        statBoost: true,
        gear: false,
        wep: true,
        equipped: false,
      },
    ], options, { validate: true }, { include: [Inventory.Stat] })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Inventories';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1, 2, 3]
      }
    }, {});
  }
};
