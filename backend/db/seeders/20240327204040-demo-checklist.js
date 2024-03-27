'use strict';
const { Checklist } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Checklist.bulkCreate([
      {
        taskId: 1,
        checklistItem: '',
        checked: false,
      },
      {
        taskId: 1,
        checklistItem: '',
        checked: false,
      },
      {
        taskId: 4,
        checklistItem: '',
        checked: false,
      },
      {
        taskId: 4,
        checklistItem: '',
        checked: false,
      },
      {
        taskId: 7,
        checklistItem: '',
        checked: false,
      },
      {
        taskId: 7,
        checklistItem: '',
        checked: false,
      },
      {
        taskId: 8,
        checklistItem: '',
        checked: false,
      },
      {
        taskId: 9,
        checklistItem: '',
        checked: false,
      },
    ], options, {validate: true})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Checklists';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      taskId: {
        [Op.in]: [1, 4, 7, 8, 9]
      }
    }, {});
  }
};
