'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production')
{
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Avatars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      faceName: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ears: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      skin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hairName: {
        type: Sequelize.STRING
      },
      hairId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      faceId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      character: {
        type: Sequelize.TEXT(1000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Avatars';
    return queryInterface.dropTable(options);
  }
};
