'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      strength: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: false,
      },
      magic: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: false,
      },
      physicalDefense: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: false,
      },
      magicDefense: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: false,
      },
      luck: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: false,
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
    options.tableName = 'Stats'
    return queryInterface.dropTable(options)
  }
};
