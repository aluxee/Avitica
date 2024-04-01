'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demolition',
        displayName: 'Demo LieShun',
        heroClass: 'Warrior',
        password: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'applesalad',
        displayName: 'Apple Muffin',
        heroClass: 'Mage',
        password: bcrypt.hashSync('password1')
      },
      {
        email: 'user2@user.io',
        username: 'infinity',
        displayName: 'Maple Syrup',
        heroClass: 'Warrior',
        password: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        username: 'bestmage',
        displayName: 'Tommy Thomas',
        heroClass: 'Mage',
        password: bcrypt.hashSync('password3')
      }
    ], options, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demolition', 'applesalad', 'infinity', 'bestmage'] }
    }, {});
  }
};
