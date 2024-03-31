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
        completed: 0
      },
      {
        title: 'Exercise for 10 minutes',
        notes: 'Do extreme cardio',
        userId: 1,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-30"),
        completed: 0
      },
      {
        title: 'Study for 1 hour',
        notes: 'Study Sequelize-Cli for software engineering class',
        userId: 1,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-30"),
        completed: 0
      },
      {
        title: 'Do dishes between cooking',
        notes: '',
        userId: 2,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-31"),
        completed: 0
      },
      {
        title: 'Read for 1 hour',
        notes: 'Pick from library book borrows',
        userId: 2,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-31"),
        completed: 0
      },
      {
        title: 'Write down achievements for the day',
        notes: 'Note three achievements and one thing to improve on',
        userId: 2,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-30"),
        completed: false
      },
      {
        title: 'Write two chapters of novel',
        notes: 'See phone notes',
        userId: 3,
        difficulty: 'Trivial',
        dueDate: new Date("2024-04-05"),
        completed: 0
      },
      {
        title: 'Organize work assignments for the week',
        notes: 'Include appointments',
        userId: 3,
        difficulty: 'Trivial',
        dueDate: new Date("2024-04-08"),
        completed: 0
      },
      {
        title: 'Call best friend',
        notes: '',
        userId: 3,
        difficulty: 'Trivial',
        dueDate: new Date("2024-03-31"),
        completed: 0
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Tasks';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
