const express = require('express')
const { Shop, Inventory } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router = express.Router();





router.get('/details/:id', requireAuth, async (req, res) => {

	const { id } = req.params;

	// console.log("%c 🚀 ~ file: shop.js:11 ~ router.get ~ id: ", "color: red; font-size: 25px", id)

	const itemDetails = await Shop.findOne({
		where: { id }
	})
	if (!id) {
		return res
			.status(404)
			.json({
				message: "Item not found"
			})
	}
	// console.log("%c 🚀 ~ file: shop.js:17 ~ router.get ~ itemDetails: ", "color: red; font-size: 25px", itemDetails)

	return res
		.json({ itemDetails })
})

router.get('/', requireAuth, async (_req, res) => {

	const shopResult = await Shop.findAll();

	return res.json({
		Shop: shopResult
	})

})






module.exports = router;
