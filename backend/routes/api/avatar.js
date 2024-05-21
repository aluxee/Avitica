const express = require('express')
const { Avatar, Stat } = require('../../db/models');
// const fetch = require('node-fetch');
const { requireAuth, authorization } = require('../../utils/auth');

const { Blob } = require('buffer');  // Use buffer module if needed
router = express.Router();


// edit avatar(display)
router.put('/edit', requireAuth, authorization, async (req, res) => {


})


const fetchAvatarImageUrl = async (avatarData) => {

	// console.log("%c 🚀 ~ file: avatar.js:134 ~ fetchAvatarImageUrl ~ avatarData: ", "color: red; font-size: 25px", avatarData)

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
				ears: earType,
				itemIds: [1060002, 1040193],
				effectFrame: 0
			}),
		});

		if (!resPost.ok) {
			throw new Error('Failed to fetch avatar image');
		}

		const imageData = await resPost.blob();

		console.log("%c 🚀 ~ file: avatar.js:212 ~ fetchAvatarImageUrl ~ imageData: ", "color: red; font-size: 25px", imageData)

		const base64Image = await blobToBase64(imageData);

		// console.log("%c 🚀 ~ file: avatar.js:216 ~ fetchAvatarImageUrl ~ base64Image: ", "color: red; font-size: 25px", base64Image)

		return base64Image;
	} catch (error) {
		console.error('Error fetching avatar image:', error);
		return null;
	}
}


// Helper function to convert blob to base64
const blobToBase64 = async (blob) => {
	const arrayBuffer = await blob.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	return buffer.toString('base64');
};

let userUrl;
let theAvatar;
// post avatar(display)
router.post('/create',  requireAuth, async (req, res) => {

	try {
		const { skinType, faceIdNumber, expression, earType, hairIdNumber } = req.body;
		const userId = req.user.id;

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
		};
		const avatarData = {
			skinType,
			expression,
			faceType: faceIdNumber,
			hairType: hairIdNumber,
			earType,
			userId
		}
		theAvatar = avatarData;
		userUrl = fetchAvatarImageUrl(avatarData);

		const response = await fetch('https://api.maplestory.net/character/render', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${process.env.MAPLESTORY_API_TOKEN}`,
				'X-Secret-Key': process.env.CLIENT_SECRET
			},
			body: JSON.stringify(reqBody)
		});

		// console.log("%c 🚀 ~ file: avatar.js:91 ~ router.post ~ response: ", "color: red; font-size: 25px", response)

		if (!response.ok) {
			const errorText = await response.text();
			console.error("Error response from API:", errorText);
			throw new Error('Failed to fetch avatar image from the third-party API');
		}

		const imageData = await response.blob();

		// console.log("%c 🚀 ~ file: avatar.js:70 ~ router.post ~ imageData: ", "color: red; font-size: 25px", imageData)

		// Convert the blob to a base64-encoded string
		const base64Image = await blobToBase64(imageData);

		return res.status(200).json({
			avatar: {
				userId,
				skinType,
				faceIdNumber,
				hairIdNumber,
				expression,
				earType,
				imageUrl: `data:image/png;base64,${base64Image}`,  // Send the base64-encoded image
			},
		});

	} catch (error) {
		res.status(500).json({ error: 'Failed to create avatar' });
	}
});


router.get('/', requireAuth, async (req, res) => {
	const userId = req.user.id;

	const imageUrl = `data:image/png;base64,${userUrl}`
	const data = theAvatar;


	const getAvatar = await Avatar.create({
		userId,
		faceType: data.faceType,
		earType: data.earType,
		skinType: data.skinType,
		hairType: data.hairType,
		expression: data.expression,
		imageUrl
	})


	await getAvatar.update();
	await getAvatar.save();
	return res.status(201).json(
		getAvatar
	)


});




module.exports = router;
