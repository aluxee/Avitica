const responsePost = fetch('https://api.maplestory.net/character/render',
	{
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify({
			"skin": "light",
			"faceId": 20000,
			"hairId": 30000,
			"pose": "walkingOneHanded",
			"poseFrame": 1,
			"faceEmote": "smile",
			"faceFrame": 0,
			"ears": "humanEars",
			"itemIds": [
				1060002,
				1040193
			],
			"effectFrame": 0
		})
	}
)
responsePost.then(response => (response.blob())).then(res => console.log(res)).catch(error => console.error('Error:', error));




const response = fetch('https://api.maplestory.net/items', {
	headers: {
		"Content-Type": "application/json",

	},
	body: JSON.stringify(
		{
			"version": 220,
			"subversion": 3,
			"locale": 2
		}
	)
})
response.then(response => (response.json())).then(res => console.log(res))


fetch('https://api.maplestory.net/item/2070006/iconRaw')
	.then(res => { return res.blob() })
	.then(blob => {
		let img = URL.createObjectURL(blob);
		console.log(img)
	})



//? querying
const reszo = fetch('https://api.maplestory.net/hairs', {
	headers: {
		"Content-Type": "application/json",
	},
	filters: {
		"nameText": "Cecelia"
	},
})
reszo.then(reszo => (reszo.json())).then(res => console.log(res.result.filter(
	(hair) => hair.name == "Cecelia")))

const reszi = fetch('https://api.maplestory.net/hairs?nameText=Cecelia', {
	headers: {
		"Content-Type": "application/json",
	},
})
reszi.then(reszi => (reszi.json())).then(res => console.log(res))
// Promise {
// 	<pending>}
// 		VM5297:6
