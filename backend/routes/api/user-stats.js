const express = require('express')
const { userStat, Inventory, Stat } = require('../../db/models');
const { requireAuth, authorization } = require('../../utils/auth');

router = express.Router();


//get all user stat (without gear or skill additions [from userStats])

router.get('/', requireAuth, async (req, res) => {

	// without a user stat we need to create one as a default, though this is still ultimately a "GET"

	const statsUser = await userStat.findAll({
		where: {
			userId: req.user.id
		},
		attributes: {
			exclude: [
				'createdAt', 'updatedAt'
			]
		}
	});
	// Check if the user stat exists
	if (!statsUser || statsUser.length === 0) {
		// res.json({"message": "none"})
		// if not, create the userStat with their default values
		try {
			const statsForUser = await userStat.create({ userId: req.user.id });

			// send res that the userStat has been successfully created
			return res
				.status(201)
				.json(statsForUser)
		} catch (err) {
			return res
				.status(500)
				.json({
					message: "Internal server error"
				});
		}
	} else {
		// if they already exist show them
		return res
			.status(200)
			.json(statsUser)
	}
});


// Get userStats for a user upon task completion
// see the route of: /:taskId/completed for the put request of task update
router.get('/:userId', async (req, res) => {
	const { userId } = req.params;

	try {
		const userExp = await userStat.findOne({
			where: { userId }
		});

		console.log("%c 🚀 ~ file: user-stats.js:60 ~ router.get ~ userExp: ", "color: red; font-size: 25px", userExp)


		// Determine current level
		const level = userExp.getLevel();
		// Calculating exp gain and updating health upon task completion (or failure to complete)
		if (taskCompleted) {
			userExp.calcHpAndExp(taskCompleted);
			// Save changes to userStats
			await userExp.save();
			res
				.status(200)
				.json({ userExp, level });
		}

	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'Internal server error' });
	}
});


//get all user stat (with gear or skill additions based on equipment equipped)













//get all user stat with gear including any items that have been used (specifically best for battle route later on)








// remove user stat w/ gear (removal of gear to see stats)







// removal of user stat with bonuses (removal of bonuses applied to user stat from items)












module.exports = router;
