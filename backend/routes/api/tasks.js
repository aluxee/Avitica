const express = require('express')
const { Task, Checklist } = require('../../db/models');
const { requireAuth, authorization } = require('../../utils/auth');

router = express.Router();


// edit a specific checklist
router.put('/:taskId/checklist/:checklistId', requireAuth, authorization, async (req, res) => {
	const { checklistId } = req.params;
	const { checklistItem } = req.body;

	const editCheckList = await Checklist.findByPk(checklistId, {
		where: {
			userId: req.user.id
		}
	})

	try {
		editCheckList.checklistItem = checklistItem
		await editCheckList.save()
		res.json(editCheckList)
	} catch (err) {

		return res
			.status(400)
			.json({
				"message": "Bad Request",
				"errors": {
					"checklistItem": "A checklist item is required"
				}
			})
	}

})


// delete specific task made by user
router.delete('/:taskId/checklist/:checklistId', requireAuth, authorization, async (req, res) => {
	const { taskId, checklistId } = req.params;

	const task = await Task.findByPk(taskId, {

		where: {
			userId: req.user.id
		}
	})

	const taskPayload = task.toJSON();
	const theList = await Checklist.findByPk(checklistId, {
		where: {
			userId: req.user.id
		}
	})


	if (!theList || !theList.userId) {
		return res
			.status(404)
			.json({
				statusCode: 404,
				message: "Check list could not be found"
			})
	}
	if (req.user.id !== theList.userId) {
		return res
			.status(403)
			.json({
				message: "Permission denied"
			})

	}

	const deleteCheckList = theList.toJSON()
	taskPayload.Checklist = deleteCheckList

	theList.destroy();

	res
		.status(200)
		.json({
			"message": "Successfully deleted"
		})
})

// post a new checklist
router.post('/:taskId/checklist/new', requireAuth, async (req, res) => {
	const { taskId } = req.params;
	const { checklistItem } = req.body;

	const listAmount = await Checklist.count({
		where: {
			taskId, checklistItem,
			userId: req.user.id
		}
	})

	if (listAmount >= 5) {
		return res
			.status(400)
			.json({
				"error": "You've reached the maximum amount of tasks with the same title name",
				"message": "You can only have five tasks running at a time"
			})
	}
	try {
		const checklist = await Checklist.create({
			taskId,
			userId: req.user.id,
			checklistItem
		})

		return res
			.status(201)
			.json(checklist)
	} catch (err) { // this code must be revisited; need to find better way to detect same name checklist items
		res
			.status(400)
			.json({
				message: "This item of the checklist already exists"
			})
	}

})


// get the entire checklist inside of a task (there is no need to collectively have all checklists)
router.get('/:taskId/checklist', requireAuth, async (req, res) => {
	const { taskId } = req.params;

	const task = await Task.findByPk(taskId, {
		include: [
			{
				model: Checklist
			}
		],
		where: {
			userId: req.user.id
		}
	})

	const taskPayload = task.toJSON();

	const allCheckLists = await Checklist.findAll({
		where: {
			taskId,
			userId: req.user.id
		}
	})

	if (allCheckLists.length === 0) {
		return res
			.json({
				message: "No checklist has been made yet for this task"
			})
	}
	taskPayload.Checklist = allCheckLists

	return res.json(allCheckLists)
})


//view a specific task by the user
router.get('/:taskId', requireAuth, async (req, res) => {
	const { taskId } = req.params;

	const task = await Task.findByPk(taskId, {
		where: {
			userId: req.user.id
		}
	})

	const taskPayLoad = task.toJSON();

	const allCheckLists = await Checklist.findAll({
		where: {
			taskId,
			userId: req.user.id
		}
	})


	taskPayLoad.Checklist = allCheckLists

	return res
		.json({
			Task: taskPayLoad
		})
})

// edits a task
//:taskId endpoint to handle this function in an editorial way to be rooted to
router.put('/:taskId', requireAuth, authorization, async (req, res) => {
	const { title, notes, difficulty, dueDate } = req.body;
	const { taskId } = req.params;

	console.log("%c 🚀 ~ file: tasks.js:17 ~ router.put ~ taskId: ", "color: red; font-size: 25px", taskId)


	if (!title) {
		return res
			.status(400)
			.json({
				"message": "A title is required"
			})
	}
	const taskUpdate = await Task.findByPk(taskId, {
		attributes: {
			exclude: []
		},
	});

	const thisDate = Date.now();
	let currentDate = new Date(thisDate);

	currentDate.toISOString().split('T')[0];
	const offset = currentDate.getTimezoneOffset();
	currentDate = new Date(currentDate.getTime() - (offset * 60 * 1000));
	const currDateCheck = currentDate.getTime();
	const thisDateTime = () => dueDate ? dueDate.getTime() : '';
	const stringDate = currentDate.toISOString().split('T')[0];

	// console.log("%c 🚀 ~ file: tasks.js:22 ~ router.post ~ stringDate: ", "color: red; font-size: 25px", stringDate)

	if (thisDateTime < currDateCheck) {
		return res
			.status(400)
			.json({
				"error": "The set due date cannot be in the past"
			})
	}

	try {

		taskUpdate.title = title
		taskUpdate.notes = notes || null,
			taskUpdate.difficulty = difficulty || "Trivial"
			|| null,
			taskUpdate.dueDate = dueDate || stringDate,

			await taskUpdate.save()


		res.json(taskUpdate)
	} catch (error) {
		return res
			.status(400)
			.json({
				"message": error
			})
	}

})


// deletes a task
router.delete('/:taskId', authorization, requireAuth, async (req, res) => {
	const { taskId } = req.params;

	const task = await Task.findByPk(taskId, {
		where: {
			userId: req.user.id
		}
	})

	if (!task) {
		return res
			.status(404)
			.json({
				"error": "Task could not be found"
			})
	}

	await task.destroy()

	res
		.status(200)
		.json({
			message: "Successfully deleted"
		})
})


// creates a new task
router.post('/new', requireAuth, async (req, res) => {
	// const { title, notes, difficulty, dueDate } = req.body;
	const { title, notes, difficulty, dueDate } = req.body;
	const thisDate = Date.now();
	let currentDate = new Date(thisDate);

	currentDate.toISOString().split('T')[0];
	const offset = currentDate.getTimezoneOffset();
	currentDate = new Date(currentDate.getTime() - (offset * 60 * 1000));
	const currDateCheck = currentDate.getTime();
	const thisDateTime = () => dueDate ? dueDate.getTime() : '';
	const stringDate = currentDate.toISOString().split('T')[0];

	// console.log("%c 🚀 ~ file: tasks.js:22 ~ router.post ~ stringDate: ", "color: red; font-size: 25px", stringDate)

	// if the date entered occurs sooner than the current date itself => error
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

		// console.log("%c 🚀 ~ file: tasks.js:46 ~ router.post ~ thisTask: ", "color: red; font-size: 25px", thisTask, thisTask.title)

		taskArray.push(thisTask);

		// if title doesn't exist in the object, add it
		// loop thru objectCheck for any existent title keys, if there are we'll count them, if not we'll make the key
		if (!objectCheck[thisTask.title]) {
			objectCheck[thisTask.title] = 1
		} else {
			objectCheck[thisTask.title]++
		}
		// if the title does exist in the object increase the count
	})
	// console.log("POST TASKS: ", objectCheck)

	for (let key in objectCheck) {
		if (objectCheck[key] >= 5) { // if there are three or more instances of this key => statusCode 403

			return res
				.status(400)
				.json({
					"error": "You've reached the maximum amount of tasks with the same title name",
					"message": "You can only have five tasks running at a time"
				})
		}
	}

	try {
		// create the task with needed key
		const task = await Task.create({
			userId: req.user.id,
			title, notes,
			difficulty: difficulty || "Trivial" || null,
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
//! ________________________________________________

// checks out all existing tasks by the user
router.get('/', requireAuth, authorization, async (req, res) => {

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


	//handle that if there is no task, list it as such rather than just an empty array
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




module.exports = router;
