const express = require('express')
const { Avatar, Stat } = require('../../db/models');
const { requireAuth, authorization } = require('../../utils/auth');

router = express.Router();


// edit avatar(display)
router.put('/edit', requireAuth, authorization, async (req, res) => {


})
// TODO: double check and ensure this route will work for the frontend 2) also may need to redo it's database section
// post avatar(display)
router.post('/create', requireAuth, authorization, async (req, res) => {
	try {
		const { skinType, faceType, expression, earType, hairType } = req.body;

		// Example: Fetching avatar image URL from a third-party API
		const response = await fetch('https://api.maplestory.net/character/render', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				skin: skinType,
				faceId: faceType,
				expression,
				earType,
				hairType
				// Include other parameters as needed
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to fetch avatar image');
		}

		const imageData = await response.json();
		const imageUrl = imageData.url; // Assuming the response structure includes the URL of the avatar image

		// Here you might save the avatar data to your database or do other processing

		res.json({ imageUrl });
	} catch (error) {
		res.status(500).json({ error: 'Failed to create avatar' });
	}

})

// get avatar(display)
router.get('/', requireAuth, authorization, async (req, res) => {

	const { user } = req;
	const userCharacter = await Avatar.findByPk(user.id, {
		include: [Stat]
	});

	console.log("%c 🚀 ~ file: avatar.js:19 ~ router.get ~ userCharacter: ", "color: red; font-size: 25px", userCharacter)


	return res.json({
		avatar: userCharacter
	})
});





// create avatar





module.exports = router;
