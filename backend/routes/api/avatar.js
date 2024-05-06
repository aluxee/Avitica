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
		const { user } = req;
		const { skinType, faceType, expression, earType, hairType } = req.body;

		let hairNum;
		let faceNum;

		if (hairType) {
			if (hairType == 'Cecelia Twist') {
				hairNum = 31490
			} else if (hairType == 'Unkempt Hair') {
				hairNum = 30025
			} else if (hairType == ['Fantasy Hair']) {
				hairNum = 30100
			}
			return hairNum
		};
		if (faceType) {
			if (faceType == 'Motivated') {
				faceNum = 20000
			} else if (faceType == 'Distant') {
				faceNum = 20035
			} else if (faceType == 'Shut Eyes') {
				faceNum = 20026
			} else if (faceType == 'Piercing') {
				faceNum = 20040
			}
			return faceNum
		}

		const faceIdNumber = Number(faceNum);
		const hairIdNumber = Number(hairNum);

		// Example: Fetching avatar image URL from a third-party API
		const resPost = await fetch('https://api.maplestory.net/character/render', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				skin: skinType,
				faceId: faceIdNumber,
				hairId: hairIdNumber,
				"pose": "walkingOneHanded",
				"poseFrame": 1,
				faceEmote: expression,
				"faceFrame": 0,
				earType,
				"itemIds": [
					1060002,
					1040193
				],
				"effectFrame": 0
				// Include other parameters as needed
			}),
		});

		if (!resPost.ok) {
			throw new Error('Failed to fetch avatar image');
		}
		const imageData = await resPost.blob();
		const imageUrl = URL.createObjectURL(imageData)// Assuming the response structure includes the URL of the avatar image

		//import the instance of the avatar
		const userAvatar = await Avatar.create({
			userId: user.id,
			skin: skinType,
			faceId: faceType,
			hairId: hairType,
			faceEmote: expression,
			earType,
			imageUrl
		})
		await userAvatar.save();

		// Here you might save the avatar data to your database or do other processing
		return res
			.status(201)
			.json({ userAvatar, imageUrl });
		//alternative: send the blob

	} catch (error) {
		res.status(500).json({ error: 'Failed to create avatar' });
	}
})

// get avatar(display): send request to third party api to get that image
router.get('/', requireAuth, authorization, async (req, res) => {

	const { user } = req;
	const userCharacter = await Avatar.findOne({
		where: {
			userId: user.id
		},
		include: [Stat]
	});

const imageUrl = await fetchAvatarImageUrl(userCharacter)

	return res.json({
		avatar: userCharacter,
		imageUrl
	})
});


async function fetchAvatarImageUrl(avatarData) {
	try {
		const { skinType, faceType, expression, earType, hairType } = avatarData;

		const resPost = await fetch('https://api.maplestory.net/character/render', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				skin: skinType,
				faceId: faceType,
				hairId: hairType,
				pose: 'walkingOneHanded',
				poseFrame: 1,
				faceEmote: expression,
				faceFrame: 0,
				earType,
				itemIds: [1060002, 1040193],
				effectFrame: 0
				// Include other parameters as needed
			}),
		});

		if (!resPost.ok) {
			throw new Error('Failed to fetch avatar image');
		}

		const imageData = await resPost.blob();
		return URL.createObjectURL(imageData);
	} catch (error) {
		console.error('Error fetching avatar image:', error);
		return null;
	}
}





module.exports = router;
