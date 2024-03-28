const express = require('express')
const { Task, User, Checklist } = require('../../db/models');
const { check } = require('express-validator');


router = express.Router();


// checks out all existing tasks by the user
router.get('/', async (_req, res) => {

	const tasks = await Task.findAll({
		include: [
			{
				model: Checklist
			}
		]
	}); // findAll method is always going to return an array of promises

	let tasksList = [];

	tasks.forEach(task => {
		let tasksData = task.toJSON();

		let allCheckLists = [];

		if (tasksData.Checklist !== null) {
			allCheckLists.push(tasksData.Checklist)
		}
		tasksData.Checklist = allCheckLists;

		if (!tasksList.some(item => item.id === tasksData.id)) {

			tasksList.push(tasksData)
		}

	})

	return res.json({
		Task: tasksList
	})
})


// creates a new task



// edits a task



// deletes a task

module.exports = router;
