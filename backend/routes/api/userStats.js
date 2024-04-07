const express = require('express')
const { userStat, Inventory, Stat, Task, User } = require('../../db/models');
const { requireAuth, authorization } = require('../../utils/auth');

router = express.Router();




// remove user stat w/ gear (removal of gear to see stats)
router.delete('/:userId/unequip', requireAuth, async (req, res) => {

	const { userId } = req.params;

	// try {
	// 	const itemToRemove = await Inventory.findByPk(statId, {
	// 		where: {
	// 			userId
	// 		}
	// 	})
	// 	if (!itemToRemove) {
	// 		return res
	// 			.status(404)
	// 			.json({
	// 				error: "Item not found"
	// 			})
	// 	}
	// 	const statUser = await userStat.findByPk(itemToRemove.userId)
	// 	if (!user) {
	// 		return res
	// 			.status(404)
	// 			.json({
	// 				error: "User not found"
	// 			})
	// 	}
	// 	// Revert stat application
	// 	const description = itemToRemove.description;
	// 	const statBooster = description.match(/Grants a (\d+)% increase in (.+):/);
	// 	if (statBooster) {



	// 		const percentageApplicator = parseInt(statBooster[1]);
	// 		const statName = statBooster[2];
	// 		const currStatVal = statUser[statName.toLowerCase()];
	// 		const statDecrease = Math.round((currStatVal * percentageApplicator / 100));

	// 		statUser[statName.toLowerCase()] -= statDecrease;

	// 		await user.save();
	// 	}
	// 	// THEN DESTROYYYYY
	// 	await itemToRemove.destroy()
	// 	return res
	// 		.status(200)
	// 		.json({
	// 			message: "Item(s)successfully removed"
	// 		});

	// } catch (err) {
	// 	res
	// 		.status(500)
	// 		.json({ error: "Internal service error" });
	// };

})

//get all user stat (with gear or skill additions based on equipment equipped)
router.get('/:userId/equipped', requireAuth, async (req, res) => {

	const { userId } = req.params;
	const equippedItems = await Inventory.findAll({
		where: {
			userId,
			[Sequelize.Op.or]: [{ gear: true }, { wep: true }],
			equipped: true
		},
		attributes: {
			exclude: ['statBoost']
		}
	})



	if (!equippedItems || equippedItems.equipped === false && (equippedItems.gear === false && equippedItems.wep === false || equippedItems.length === 0)) {
		return res
			.json({
				message: "There are no gear items or weapons equipped right now"
			})
	}

	await equippedItems.forEach(equip => {
		// parse description to find out stat
		const description = equip.description;
		const statBooster = description.match(/Grants a (\d+)% increase in (.+):/);
		if (statBooster) {



			const percentageApplicator = parseInt(statBooster[1]);
			const statName = statBooster[2];

			// update the users stats based on above info extrapolated
			const userStatUpdate = userStat.findAll({
				where: {
					userId
				}
			}) // cannot personally await

			for (let user of userStatUpdate) {
				//apply stats
				const currStatVal = user[statName.toLowerCase()]
				const statIncrease = Math.round((currStatVal * percentageApplicator) / 100)
				user[statName.toLowerCase()] += statIncrease

				user.save(); // cannot personally await
			}
		}

	});

	res.json({
		message: "Equipped gear items / weapon items successful"
	});
});



//route where an inventory item potion is used it will apply to the depleted health
router.get('/:userId/potion', requireAuth, async (req, res) => {
	const { userId } = req.params;
	const potionItem = await Inventory.findAll({
		where: {
			userId,
			healthBoost: true
		},
		attributes: {
			exclude: ['gear', 'wep', 'statBoost', 'equipped']
		}
	})
	if (potionItem.length === 0) {
		return res
			.status(404)
			.json({
				error: "No health potions available"
			})
	}


	const userStatus = await userStat.findByPk(userId)


	const currHealth = userStatus.health;

	//if currHealth is less than 100%
	if (currHealth < 100) {
		// use available health potions
		const potionItem = potionItems[0]

		//add the 40 since this is the only potion available
		userStatus.health = Math.min(currHealth + 50, 100) // the 100 is to ensure that the health does not exceed 100%

		await userStatus.save();
		//potion must be destroyed
		await potionItem.destroy();
		return res
			.status(200)
			.json({
				message: "Health potion used successfully"
			})
	} else {
		return res
			.status(400)
			.json({
				error: "Health status is already full"
			})
	}
});






// Get userStats for a user upon task completion
// see the put route for the put request of task
router.get('/current', async (req, res) => {
	//! this may end up hanging, do not test solely on the backend

	const { completed } = req.body;
	const taskMark = await Task.findAll({
		where: {
			userId: req.user.id
		}
	})
	try {
		const userInfo = await userStat.findByPk(req.user.id);

		console.log("%c 🚀 ~ file: userStats.js:201 ~ router.get ~ userInfo: ", "color: red; font-size: 25px", userInfo)



		// Determine current level
		const level = userInfo?.getLevel();

		console.log("%c 🚀 ~ file: userStats.js:205 ~ router.get ~ level: ", "color: red; font-size: 25px", level)


		// Calculating exp gain and updating health upon task completion (or failure to complete)
		if (completed) {
			taskMark.completed = completed
			userInfo.calcHpAndExp(completed);
			// Save changes to userStats
			await userInfo.save();

			res
				.status(200)
				.json({ userInfo, level });
		}

	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'Internal server error' });
	}
});




//get all user stat (without gear or skill additions [from userStats])

router.get('/', requireAuth, async (req, res) => {
	try {
		// without a user stat we need to create one as a default, though this is still ultimately a "GET"
		const { user } = req;

		console.log("%c 🚀 ~ file: userStats.js:2349 ~ router.get ~ user: ", "color: red; font-size: 25px", user, user.heroClass)


		// all the userStats of a user (health, exp)
		const userStats = await userStat.findByPk(user.id, {

			attributes: {
				exclude: [
					'createdAt', 'updatedAt'
				]
			}
		});

		console.log("%c 🚀 ~ file: userStats.js:252 ~ router.get ~ userStats: ", "color: red; font-size: 25px", userStats)


		// if (!userStats || userStats === null || userStats) {

		// 	// create def vals for user's stats
		// 	if (user.heroClass === 'Warrior') {
		// 		await userStat.setDefWar(user.heroClass)
		// 	} else if (user.heroClass === 'Mage') {
		// 		await userStat.setDefMage(user.heroClass)
		// 	} else {
		// 		throw new Error("Invalid hero class type")
		// 	}
		// 	//	fetch the stats after making the default
		// 	userStats = await userStat.findOne({
		// 		// where: {
		// 		// 	userId: user.id
		// 		// },
		// 		attributes: {
		// 			exclude: [
		// 				'createdAt', 'updatedAt'
		// 			]
		// 		}
		// 	})
		// 	console.log("%c 🚀 ~ file: userStats.js:304 ~ router.get ~ userStats: ", "color: red; font-size: 25px", userStats)


		// 	const level = userStats ? userStats.getLevel() : 1;


		// 	// combine results for response
		// 	const response = {
		// 		Stats: {
		// 			hp: userStats.health,
		// 			strength: userStats.strength,
		// 			magic: userStats.magic,
		// 			physicalDefense: userStats.physicalDefense,
		// 			magicDefense: userStats.magicDefense,
		// 			luck: userStats.luck
		// 		},
		// 		userStat: {
		// 			userId: user.id,
		// 			health: userStats.health || 50,
		// 			experience: userStats.experience || 0,
		// 			level: level
		// 		}
		// return res
		// .json({Stats: response})
		// 	}

	// }
		// else {
// 			const currUser = await User.findByPk(user.id, {
// 		where: {
// 			id: user.id
// 		},
// 		include: [{
// 			model: userStat
// 		}]
// 	})
// 	return res
// 		.json({ Stats: currUser })
// }
		return res
		.json({Stats: userStats})
	} catch (err) {

	return res
		.status(400)
		.json({
			error: `Error fetching user stats: ${err}`
		})
}
});









//? get all user stat with gear including any items that have been used (specifically best for battle route later on)














//? removal of user stat with bonuses (removal of bonuses applied to user stat from items)












module.exports = router;
