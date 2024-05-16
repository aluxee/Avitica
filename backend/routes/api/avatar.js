const express = require('express')
const { Avatar, Stat } = require('../../db/models');
// const fetch = require('node-fetch');
const { requireAuth, authorization } = require('../../utils/auth');

router = express.Router();


// edit avatar(display)
router.put('/edit', requireAuth, authorization, async (req, res) => {


})


// TODO: double check and ensure this route will work for the frontend 2) also may need to redo it's database section
// post avatar(display)
router.post('/create', async (req, res) => {


	try {
		const { skinType, faceIdNumber, expression, earType, hairIdNumber } = req.body;

		// console.log("%c 🚀 ~ file: avatar.js:25 ~ router.post ~ skinType: ", "color: red; font-size: 25px", skinType) // tanned

		const reqBody = {


			"skin": skinType,
			"faceId": faceIdNumber,
			"hairId": hairIdNumber,
			"pose": "walkingOneHanded",
			"poseFrame": 1,
			"faceEmote": expression,
			"faceFrame": 0,
			"ears": earType,
			"itemIds": [
				1060002,
				1040193
			],
			"effectFrame": 0
		}
		// console.log("%c 🚀 ~ file: avatar.js:103 ~ router.post ~ reqBody: ", "color: red; font-size: 25px", reqBody)

		const response = await fetch('https://api.maplestory.net/character/render', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				// may need to add the other headers from env
				'Authorization': `Bearer ${process.env.MAPLESTORY_API_TOKEN}`,
				'X-Secret-Key': process.env.CLIENT_SECRET
			},
			body: JSON.stringify(reqBody)
		})

		// console.log("%c 🚀 ~ file: avatar.js:151 ~ router.post ~ response: ", "color: red; font-size: 25px", response)

		// Check if the response is ok
		if (!response.ok) {
			throw new Error('Failed to fetch avatar image from the third-party API');
		}
		const imageData = await response.blob();

		// console.log("%c 🚀 ~ file: avatar.js:108 ~ router.post ~ imageData: ", "color: red; font-size: 25px", imageData)

		const imageUrl = URL.createObjectURL(imageData);

		// console.log("%c 🚀 ~ file: avatar.js:112 ~ router.post ~ imageUrl: ", "color: red; font-size: 25px", imageUrl)

		return res.status(200).json({
			// skin: skinType,
			avatar: {
				skinType,
				faceIdNumber,
				hairIdNumber,
				expression,
				earType,
				imageUrl,
			},
		});


	} catch (error) {
		res.status(500).json({ error: 'Failed to create avatar' });
	}
})

// get avatar(display): send request to third party api to get that image
router.get('/', async (req, res) => {


	// const { user } = req;

	// console.log("%c 🚀 ~ file: avatar.js:132 ~ router.get ~ user: ", "color: red; font-size: 25px", user)

	const userCharacter = await Avatar.findOne({
		where: {
			// userId: user.id
		},
		// include: [Stat]
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

		console.log("%c 🚀 ~ file: avatar.js:119 ~ fetchAvatarImageUrl ~ avatarData: ", "color: red; font-size: 25px", avatarData)

		let hairNum;
		let faceNum;

		if (hairType) {

			console.log("%c 🚀 ~ file: avatar.js:33 ~ router.post ~ hairType: ", "color: red; font-size: 25px", hairType)

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

			console.log("%c 🚀 ~ file: avatar.js:46 ~ router.post ~ faceType: ", "color: red; font-size: 25px", faceType)

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

		console.log("%c 🚀 ~ file: avatar.js:56 ~ router.post ~ faceIdNumber: ", "color: red; font-size: 25px", faceIdNumber)

		const hairIdNumber = Number(hairNum);

		console.log("%c 🚀 ~ file: avatar.js:60 ~ router.post ~ hairIdNumber: ", "color: red; font-size: 25px", hairIdNumber)



		const resPost = await fetch('https://api.maplestory.net/character/render', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				skin: skinType,
				faceId: faceIdNumber,
				hairId: hairIdNumber,
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
		console.log("%c 🚀 ~ file: avatar.js:217 ~ fetchAvatarImageUrl ~ resPost: ", "color: red; font-size: 25px", resPost)

		const imageData = await resPost.blob();

		console.log("%c 🚀 ~ file: avatar.js:224 ~ fetchAvatarImageUrl ~ imageData: ", "color: red; font-size: 25px", imageData)

		const imageUrl = URL.createObjectURL(imageData);

		console.log("%c 🚀 ~ file: avatar.js:150 ~ fetchAvatarImageUrl ~ imageUrl: ", "color: red; font-size: 25px", imageUrl)

		return imageUrl;
	} catch (error) {
		console.error('Error fetching avatar image:', error);
		return null;
	}
}





module.exports = router;
