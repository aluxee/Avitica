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
        checklistItem: 'Completed two loads of clothing',
        checked: false,
      },
      {
        taskId: 1,
        checklistItem: 'Folded all loads',
        checked: false,
      },
      {
        taskId: 4,
        checklistItem: 'Started with dinner at 5pm',
        checked: false,
      },
      {
        taskId: 4,
        checklistItem: 'Got half of dish load done',
        checked: false,
      },
      {
        taskId: 7,
        checklistItem: 'Reviewed prologue',
        checked: false,
      },
      {
        taskId: 7,
        checklistItem: 'Introduced two characters within two chapters',
        checked: false,
      },
      {
        taskId: 8,
        checklistItem: 'Wrote down morning routine for all weekdays',
        checked: false,
      },
      {
        taskId: 2,
        checklistItem: 'Included burpees',
        checked: false,
      },
    ], options, {validate: true})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Checklists';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      taskId: {
        [Op.in]: [1, 4, 7, 8, 2]
      }
    }, {});
  }
};
