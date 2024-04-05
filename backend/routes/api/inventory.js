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






//for consistent inventory structure with localStorage usage
router.post('/new', requireAuth, async (req, res) => {
	// grab cart items send to this route, store cart item into inv thru for loop
	//	fetch body pass in cart items

	const { cartItems,  } = req.body;





	const invArr = []
	for (let item of cartItems) {
		const shop = await Shop.findOne({
			where: {
				id: item.id
			}
		})
		const inventory = await Inventory.create({
			userId: req.user.id,
			shopId: shop.id,
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
	//extraction from localStorage so no need to utilize inventory unless extraction from state
	return res
		.json({
			inventory: invArr
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
