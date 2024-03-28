const express = require('express')
const { Task, User, Checklist } = require('../../db/models');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');

router = express.Router();



// creates a new task
router.post('/new', requireAuth, async (req, res) => {
	// const { title, notes, difficulty, dueDate } = req.body;
	const { title, notes, difficulty, dueDate } = req.body;
	const thisDate = Date.now();
	let currentDate = new Date(thisDate);

	currentDate.toISOString().split('T')[0]
	const offset = currentDate.getTimezoneOffset()
	currentDate = new Date(currentDate.getTime() - (offset * 60 * 1000))
	const currDateCheck = currentDate.getTime();
	const thisDateTime = () => dueDate ? dueDate.getTime() : '';
	const stringDate = currentDate.toISOString().split('T')[0]

	console.log("%c 🚀 ~ file: tasks.js:22 ~ router.post ~ stringDate: ", "color: red; font-size: 25px", stringDate)

	if (thisDateTime < currDateCheck) {
		return res
			.status(400)
			.json({
				"error": "The set due date cannot be in the past"
			})
	}

	const postTasks = await Task.findAll({
		attributes: [
			'id', 'title'
		],
		where: {
			userId: req.user.id
		}
	})

	const taskArray = []
	const objectCheck = {}
	postTasks.forEach(task => {
		let thisTask = task.toJSON();

		console.log("%c 🚀 ~ file: tasks.js:46 ~ router.post ~ thisTask: ", "color: red; font-size: 25px", thisTask, thisTask.title)

		taskArray.push(thisTask);

		// if title doesn't exist in the object, add it
		if (!objectCheck[thisTask.title]) {
			objectCheck[thisTask.title] = 1
		} else {
			objectCheck[thisTask.title]++
		}
		// if the title does exist in the object increase the count
	})
	// console.log("POST TASKS: ", objectCheck)

	for (let key in objectCheck) {
		if (objectCheck[key] >= 3) {

			return res
				.status(403)
				.json({
					"error": "You've reached the maximum amount of tasks with the same title name"
				})
		}
	}

	try {

		const task = await Task.create({
			userId: req.user.id,
			title, notes, difficulty,
			dueDate: dueDate || stringDate
		})
		return res
			.status(201)
			.json({ Task: task })

	} catch (err) {
		res
			.status(400)
			.json(err)
	}


})






// checks out all existing tasks by the user
router.get('/', requireAuth, async (req, res) => {

	const { user } = req;
	console.log("USER: ", user);
	const tasks = await Task.findAll({
		include: [
			{
				model: Checklist
			}
		],
		where: {
			userId: req.user.id
		}
	}); // findAll method is always going to return an array of promises


	// console.log("Whats the task look like: ", tasks)
	if (tasks.length == 0) {
		return res.json({
			"Task": null
		})
	}


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
		return tasksList
	})

	return res.json({
		Task: tasksList
	})
})




// edits a task



// deletes a task

module.exports = router;
