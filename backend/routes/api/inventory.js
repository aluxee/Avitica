const express = require('express')
const { Inventory, userStat, Shop, User } = require('../../db/models');
const { requireAuth, authorization } = require('../../utils/auth');

router = express.Router();



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

	const { cartItems, } = req.body;
	const invArr = []
	let newStatUser;
	for (let item of cartItems) {
		const shopItem = await Shop.findOne({
			where: {
				id: item.id
			}
		})

		// console.log("%c 🚀 ~ file: inventory.js:66 ~ router.post ~ shopItem: ", "color: red; font-size: 25px", shopItem, "IS THIS UNDEFINED? IF SO TURN IT TO A JSON: ", shopItem.gold)


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
		//ensure user has enough gold to purchase item
		// console.log("%c 🚀 ~ file: inventory.js:85 ~ router.post ~ newStatUser: ", "color: red; font-size: 25px", newStatUser.gold)
		// console.log("%c 🚀 ~ file: inventory.js:85 ~ router.post ~ itemCost: ", "color: red; font-size: 25px", itemCost)
		if (newStatUser.gold < itemCost) {


			return res
				.status(400)
				.json({
					message: "Insufficient funds"
				})
		}
		newStatUser.gold -= itemCost;
		// console.log("%c 🚀 ~ file: inventory.js:93 ~ router.post ~ userStats: ", "color: pink; font-size: 28px", newStatUser, newStatUser.gold)

		// await newStatUser.save();
		const inventory = await Inventory.create({
			userId: req.user.id,
			shopId: shopItem.id,
			itemName: item.itemName,
			itemType: item.itemType,
			healthBoost: item.healthBoost,
			statBoost: item.statBoost,
			gear: item.gear,
			wep: item.wep,

		})
		inventory.save()
		invArr.push(inventory)
		// return res
	}
	// console.log("%c 🚀 ~ file: inventory.js:116 ~ router.post ~ newStatUser (BEFORE THE RETURN OF THE JSON): ", "color: gold; font-size: 25px", newStatUser, newStatUser.gold)

	//extraction from localStorage so no need to utilize inventory unless extraction from state
	return res
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
				order: ['healthBoost', 'statBoost'],
				include: [{
					model: Shop,
					attributes: ['itemIcon']
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
