'use strict';
const { Task } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Task.bulkCreate([
      {
        title: 'Laundry',
        notes: 'All baskets',
        userId: 1,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-30"),
      },
      {
        title: 'Exercise for 10 minutes',
        notes: 'Do extreme cardio',
        userId: 1,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-30"),
      },
      {
        title: 'Study for 1 hour',
        notes: 'Study Sequelize-Cli for software engineering class',
        userId: 1,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-30"),
      },
      {
        title: 'Do dishes between cooking',
        notes: '',
        userId: 2,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-31"),
      },
      {
        title: 'Read for 1 hour',
        notes: 'Pick from library book borrows',
        userId: 2,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-31"),
      },
      {
        title: 'Write down achievements for the day',
        notes: 'Note three achievements and one thing to improve on',
        userId: 2,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-30"),
      },
      {
        title: 'Write two chapters of novel',
        notes: 'See phone notes',
        userId: 3,
        difficulty: 'Trivial',
        dueDate: new Date("2024-04-05"),
      },
      {
        title: 'Organize work assignments for the week',
        notes: 'Include appointments',
        userId: 3,
        difficulty: 'Trivial',
        dueDate: new Date("2024-04-08"),
      },
      {
        title: 'Call best friend',
        notes: '',
        userId: 3,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-31"),
      },
    ], options, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Tasks';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {
        [Op.in]: [1, 2, 3]
      }
    }, {});
  }
};
