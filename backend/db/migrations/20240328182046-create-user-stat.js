'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id' //joins table associated
        },
        onDelete: 'CASCADE'
      },
      health: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 50
      },
      experience: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      statId: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: 'Stats',
          key: 'id' //joins table associated
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'userStats'
    return queryInterface.dropTable(options)
  }
};
