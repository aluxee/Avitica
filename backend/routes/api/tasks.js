const express = require('express');
const { Task, Checklist, userStat } = require('../../db/models');
const { requireAuth, authorization } = require('../../utils/auth');

router = express.Router();


// edit a specific checklist, this also includes being able to complete the checklist
router.put('/:taskId/checklist/:checklistId', requireAuth, authorization, async (req, res) => {
	//* may require frontend testing
	const { checklistId } = req.params;
	const { checked } = req.body;

	try {
		const editCheckList = await Checklist.findByPk(checklistId, {
			where: {
				userId: req.user.id
			}
		})
		if (!editCheckList) {
			return res
				.status(404)
				.json({
					message: "Checklist not found"
				})
		}
		//update checklist item's checked status and utilize the checklist checked boolean attribute
		editCheckList.checked = checked;

		await editCheckList.save();
		res.json(editCheckList);
	} catch (err) {

		return res
			.status(400)
			.json({
				"message": "Bad Request",
				"errors": {
					"checklistItem": "A checklist item is required"
				}
			});
	}
});


// delete specific checklist made by user
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

	if (listAmount > 1) {
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
			});
	}

});


// get the entire checklist inside of a task (there is no need to collectively have all checklists)
router.get('/:taskId/checklist', requireAuth, async (req, res) => {
	const { taskId } = req.params;

	const allCheckLists = await Checklist.findAll({
		where: {
			taskId,
			userId: req.user.id
		}
	});

	let checklists = [];
	allCheckLists.forEach(list => {
		const checkListBox = list.toJSON();

		// console.log("%c 🚀 ~ file: tasks.js:149 ~ router.get ~ checkListBox: ", "color: red; font-size: 25px", checkListBox)

		checklists.push(checkListBox)

	})

	// console.log("%c 🚀 ~ file: tasks.js:155 ~ router.get ~ checklists: ", "color: red; font-size: 25px", checklists)


	// console.log("%c 🚀 ~ file: tasks.js:158 ~ router.get ~ checklists: ", "color: cyan; font-size: 25px", checklists)

	const tasks = await Task.findAll({
		where: {
			userId: req.user.id,
			id: taskId
		}
	});

	const tasksList = [];
	tasks.forEach(task => {
		const viewTask = task.toJSON();

		viewTask.Checklist = checklists;
		tasksList.push(viewTask)
	});

	if (allCheckLists.length === 0) {
		return res
			.json({
				message: "No checklist has been made yet for this task"
			});
	};
	console.log("%c 🚀 ~ file: tasks.js:191 ~ router.get ~ tasksList: ", "color: red; font-size: 25px", tasksList, tasksList.Checklist)

	const checklistsArray = tasksList.map(task => task.Checklist).flat();

	console.log("%c 🚀 ~ file: tasks.js:186 ~ router.get ~ checklistsArray: ", "color: red; font-size: 25px", checklistsArray)



	return res.json(checklistsArray)
});




// * Keep in mind there are two types of task edits: one will edit the task itself, the other updates the task when a task is marked as complete or incomplete -- this one is the latter

router.put('/:taskId/status', requireAuth, async (req, res) => {
	const { taskId } = req.params;
	//find userStat information
	const userStatus = await userStat.findOne({
		where: {
			userId: req.user.id
		}
	})
	const taskUpdate = await Task.findByPk(taskId, {
		where: {
			userId: req.user.id
		}
	})
	// retrieve user's current level
	const currLevel = userStatus.getLevel();
	// initialize experience gain to start at 0
	let expGain = 0;
	//initialize gold gain variable
	let goldGain;
	if (taskUpdate.completed === true) {
		expGain = Math.max(10, 50 - (currLevel - 1) * 5);
		userStatus.experience += expGain;
		goldGain = Math.max(10, 85 + (currLevel - 1) * 12)
		userStatus.gold += goldGain;
		// also must consider level increase
		const newLevel = userStatus.getLevel();

		if (newLevel > currLevel) {
			//perform actions related to level up (most likely a front end dealings)
			return res
				.status(200)
				.json({
					message: `Congratulations! You've reached level ${newLevel}`
				})
		}
	} else {
		const healthLoss = Math.ceil(12 * (currLevel * 0.75))
		userStatus.health -= healthLoss;

		if (userStatus.health <= 0) {
			userStatus.health = userStatus.calcDefaultHealth(currLevel)
			userStatus.experience = 0
			return res
				.json({
					message: `Oh no! Your health has been completely depleted! Your experience and health will now reset.`
				})
		}
	}
})



// * Keep in mind there are two types of task edits: one will edit the task itself, the other updates the task when a task is marked as complete or incomplete -- this one is the first

//* update task only
router.put('/:taskId', requireAuth, async (req, res) => {
	//* May need testing with front end
	// this portion must come from the frontend where the task is marked as complete by boolean of check to indicate that the task is or is not complete
	const { title, notes, difficulty, dueDate, completed } = req.body;
	const { taskId } = req.params;


	try {
		if (!title) {
			return res
				.status(400)
				.json({
					"message": "A title is required"
				})
		}

		const taskUpdate = await Task.findByPk(taskId, {
			where: {
				userId: req.user.id
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

		if (thisDateTime < currDateCheck) {
			return res
				.status(400)
				.json({
					"error": "The set due date cannot be in the past"
				})
		}

		taskUpdate.title = title
		taskUpdate.notes = notes || null
		taskUpdate.difficulty = difficulty || "Trivial" || null
		taskUpdate.dueDate = dueDate || stringDate
		// utilize the task completion (boolean) attribute prior to the point changes
		taskUpdate.completed = completed


		// LevelStats: userStatus
		//save taskUpdate status
		await taskUpdate.save();

		// confirm such actions w/ model fxn implementation
		return res
			.status(200)
			.json(taskUpdate);

	} catch (err) {
		return res
			.status(500)
			.json({
				message: "Internal server error"
			});
	}
});




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
		.json(
			taskPayLoad
		);
});



// edits a task
//:taskId endpoint to handle this function in an editorial way to be rooted to
// * Keep in mind there are two types of task edits: one will edit the task itself, the other updates the task when a task is marked as complete or incomplete -- this one is the prior
// router.put('/:taskId/edit', requireAuth, async (req, res) => {

// })


// deletes a task
router.delete('/:taskId', requireAuth, async (req, res) => {
	const { taskId } = req.params;

	const task = await Task.findByPk(taskId, {
		where: {
			userId: req.user.id
		}
	})

	if (!taskId) {
		return res
			.status(404)
			.json({
				"error": "Task could not be found"
			})
	}

	await task.destroy();

	res
		.status(200)
		.json({
			message: "Successfully deleted"
		});
});



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
	});

	const taskCounter = await Task.count({
		where: {
			userId: req.user.id,
			title
		}
	})
	if (taskCounter > 1) {
		return res
			.status(400)
			.json({
				"error": "You've reached the maximum amount of tasks with the same title name",
				"message": "You can only have five tasks running at a time"
			})
	}
	const taskArray = []
	const objectCheck = {}
	postTasks.forEach(task => {
		let thisTask = task.toJSON();

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

	for (let key in objectCheck) {
		if (objectCheck[key] >= 5) { // if there are three or more instances of this key => statusCode 403

			return res
				.status(400)
				.json({
					"error": "You've reached the maximum amount of tasks with the same title name",
					"message": "You can only have five tasks running at a time"
				});
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

});
//! ________________________________________________


// checks out all existing tasks by the user
router.get('/', requireAuth, authorization, async (req, res) => {

	const { user } = req;
	const tasks = await Task.findAll({
		where: {
			userId: user.id
		}
	}); // findAll method is always going to return an array of promises

	//handle that if there is no task, list it as such rather than just an empty array
	if (tasks.length == 0) {
		return res.json({
			"Task": null
		});
	}

	let tasksList = [];

	for (const task of tasks) {
		const tasksData = task.toJSON();
		const checklists = await Checklist.findAll({
			where: {
				userId: req.user.id,
				taskId: task.id
			}
		});
		tasksData.Checklist = checklists.map(list => list.toJSON())

		console.log("%c 🚀 ~ file: tasks.js:515 ~ router.get ~ Checklist: ", "color: red; font-size: 25px", Checklist)

		tasksList.push(tasksData)
	}

	return res.json({
		Task: tasksList
	})
});

module.exports = router;
