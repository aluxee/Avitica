const express = require('express')
const { Inventory, userStat, Shop } = require('../../db/models');
const { requireAuth, authorization } = require('../../utils/auth');

router = express.Router();



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
