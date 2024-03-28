'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inventories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      //   references: {
      //     model: 'Users',
      //   },
      //   onDelete: 'CASCADE'
      },
      statId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'userStats',
        // },
        // onDelete: 'CASCADE'
      },
      itemName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      itemType: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      healthBoost: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      statBoost: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      gear: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1
      },
      wep: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1
      },
      equipped: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      description: {
        type: Sequelize.STRING(250),
        allowNull: false
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
    options.tableName = 'Inventories'
    return queryInterface.dropTable(options);
  }
};
