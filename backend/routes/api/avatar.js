const express = require('express')
const { Avatar } = require('../../db/models');
const { requireAuth, authorization } = require('../../utils/auth');

router = express.Router();


// get avatar(display)
router.get('/', requireAuth, authorization, async (req, res) => {

	const { user } = req;
	const userCharacter = await Avatar.findOne({
		where: {
			userId: user.id
		}
	});
	//handle that if there is no task, list it as such rather than just an empty array
	// if (tasks.length == 0) {
	// 	return res.json({
	// 		"Task": []
	// 	});
	// }

	// let tasksList = [];

	// for (const task of tasks) {
	// 	const tasksData = task.toJSON();
	// 	const checklists = await Checklist.findAll({
	// 		where: {
	// 			userId: req.user.id,
	// 			taskId: task.id
	// 		}
	// 	});
	// 	tasksData.Checklist = checklists.map(list => list.toJSON())

	// 	// console.log("%c 🚀 ~ file: tasks.js:515 ~ router.get ~ Checklist: ", "color: red; font-size: 25px", Checklist)

	// 	tasksList.push(tasksData)
	// }

	return res.json({
		Task: tasksList
	})
});





// create avatar





module.exports = router;
