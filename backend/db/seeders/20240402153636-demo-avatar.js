'use strict';
const { Avatar } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // faceName
    const face1 = await fetch('https://api.maplestory.net/face/20035'); //distant gaze
    const dataFace1 = await face1.json();
    const face2 = await fetch('https://api.maplestory.net/face/20026'); //shut eye
    const dataFace2 = await face2.json();
    const face3 = await fetch('https://api.maplestory.net/face/20040'); // piercing gaze
    const dataFace3 = await face3.json();

    // ears: humanEars, bigEars (elven) -- front end will say elven and select bigEars
    ;
    //skin: light, ashen, clay, tanned, dark
    // hairName -- id can be changed for color: black, red, orange, blonde, green, blue, purple, brown
    const hair1 = await fetch('https://api.maplestory.net/hair/30025'); //unkempt hair(blue)
    const dataHair1 = await hair1.json();
    const hair2 = await fetch('https://api.maplestory.net/hair/31494'); // green cecelia
    const dataHair2 = await hair2.json();
    const hair3 = await fetch('https://api.maplestory.net/hair/30106'); //maroon fantasy
    const dataHair3 = await hair3.json();


    await Avatar.bulkCreate([
      {
        userId: 1,
        faceType: `Distant Gaze`,
        earType: 'Human',
        skinType: 'Tanned',
        hairType: `Blue Unkempt Hair`,
        expression: 'default',
      },
      {
        userId: 2,
        faceType: `Shut Eyes`,
        earType: 'Elven',
        skinType: 'Dark',
        hairType: `Green Cecelia Twist`,
        expression: 'default',

      }, {
        userId: 3,
        faceType: `Piercing Gaze`,
        earType: 'Elven',
        skinType: 'Ashen',
        hairType: `Maroon Fantasy Hair`,
        expression: 'default',
      },

    ], options, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Avatars';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1, 2, 3]
      }
    }, {});
  }
};
