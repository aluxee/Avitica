const express = require('express')
const { Shop } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router = express.Router();

router.get('/', requireAuth, async (_req, res) => {

	const shopResult = await Shop.findAll();

	return res.json({
		Shop: shopResult
	})

})

module.exports = router;
