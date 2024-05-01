const express = require('express')
const { Inventory, userStat, Shop, User } = require('../../db/models');
const { requireAuth, authorization } = require('../../utils/auth');

router = express.Router();


// remove item
router.delete('/:itemId', requireAuth, authorization, async (req, res) => {

	const { itemId } = req.params;
	const item = await Inventory.findByPk(itemId, {
		where: {
			userId: req.user.id
		}
	})

	console.log("%c 🚀 ~ file: inventory.js:18 ~ router.delete ~ item: ", "color: red; font-size: 25px", item)

	await item.destroy();
	res
		.status(200)
		.json({
			"message": "Successfully deleted"
		})


})

//for utilization of an item
router.post('/use-item', requireAuth, async (req, res) => {
	try {
		const { itemId, userId } = req.body;

		// Retrieve the inventory item with its associated stat
		const inventoryItem = await Inventory.findOne({
			where: { id: itemId },
			include: { association: 'Stat' }
		});

		if (!inventoryItem) {
			return res.status(404).json({ message: 'Inventory item not found' });
		}

		// Extract the stat value from the inventory item
		const { hp } = inventoryItem.Stat;

		// Add the extracted stat value to the user's stats
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Assuming the user has a stats association
		user.Stats.hp += hp; // Add the hp stat to the user's existing hp

		// Save the updated user
		await user.save();

		return res.status(200).json({ message: 'Item used successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});






//for consistent inventory structure with localStorage usage, includes gold usage
router.post('/new', requireAuth, async (req, res) => {
	// grab cart items send to this route, store cart item into inv thru for loop
	//	fetch body pass in cart items

	const { cartItems } = req.body;

	console.log("%c 🚀 ~ file: inventory.js:79 ~ router.post ~ cartItems: ", "color: red; font-size: 25px", cartItems)

	const invArr = [];
	let newStatUser;
	let confirmItem;
	for (let item of cartItems) {

		console.log("%c 🚀 ~ file: inventory.js:85 ~ router.post ~ item: ", "color: red; font-size: 25px", item)
		let currHealthBoost;
		if (item.itemName === 'Red Potion') {
			currHealthBoost = true
			confirmItem = true


		}
		console.log("%c 🚀 ~ file: inventory.js:90 ~ router.post ~ currHealthBoost: ", "color: red; font-size: 25px", currHealthBoost)

		const shopItem = await Shop.findOne({
			where: {
				id: item.id
			}
		})

		const itemCost = shopItem.gold
		//find curr users gold amt
		const userStats = await userStat.findOne({
			where: {
				userId: req.user.id
			}
		})
		// ensure userStats exist
		if (!userStats) {
			return res
				.status(400)
				.json({
					message: "User stats not found"
				})
		}
		newStatUser = userStats.toJSON();

		console.log("%c 🚀 ~ file: inventory.js:107 ~ router.post ~ newStatUser: ", "color: red; font-size: 25px", newStatUser)


		if (newStatUser.gold < itemCost) {


			return res
				.status(400)
				.json({
					message: "Insufficient funds"
				})
		}
		newStatUser.gold -= itemCost;
		// console.log("%c 🚀 ~ file: inventory.js:93 ~ router.post ~ userStats: ", "color: pink; font-size: 28px", newStatUser, newStatUser.gold)

		const inventory = await Inventory.create({
			userId: req.user.id,
			shopId: shopItem.id,
			itemName: item.itemName,
			itemType: item.itemType || item.itemName === 'Red Potion' ? confirmItem : item.itemType,
			healthBoost: item.healthBoost || item.itemName === 'Red Potion' ? currHealthBoost : item.healthBoost,
			statBoost: item.statBoost,
			gear: item.gear,
			wep: item.wep,

		})

		// console.log("%c 🚀 ~ file: inventory.js:135 ~ router.post ~ inventory: ", "color: red; font-size: 25px", inventory)

		await inventory.save();
		invArr.push(...cartItems, inventory)
		// return res
	}
	// console.log("%c 🚀 ~ file: inventory.js:116 ~ router.post ~ newStatUser (BEFORE THE RETURN OF THE JSON): ", "color: gold; font-size: 25px", newStatUser, newStatUser.gold)

	//extraction from localStorage so no need to utilize inventory unless extraction from state
	return res
		.status(201)
		.json({
			inventory: invArr,
			stats: newStatUser
			// message: 'Success!'
		})

})

// get route : items in the inventory (includes gear)
// * to be continued with receiving more inventory data
router.get('/', requireAuth, async (req, res) => {

	try {

		const inventory = await Inventory.findAll(
			{
				where: {
					userId: req.user.id
				},

				order: [['healthBoost', 'DESC'], ['equipped', 'ASC'], ['statBoost', 'DESC']],
				include: [{
					model: Shop,
					attributes: ['itemIcon', 'description']
				}],
			}
		)


		res.json({ Inventory: inventory });
	} catch (err) {
		return res
			.status(500)
			.json({
				message: "Failed to catch inventory"
			})
	}

});



module.exports = router;
