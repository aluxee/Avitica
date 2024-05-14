import { useState, useEffect } from 'react';
// import { useDispatch } from "react-redux";
// import { thunkCreateAvatar, thunkLoadAvatar } from '../../store/avatar';


import './CreateAvatar.css';

function CreateAvatar() {
	// const dispatch = useDispatch();
	const [avatarState, setAvatarState] = useState("");


	const [expression, setExpression] = useState("");
	const [faceType, setFaceType] = useState(0);
	const [earType, setEarType] = useState("");
	const [skinType, setSkinType] = useState("");
	const [hairType, setHairType] = useState(0);
	const faceIdNumber = Number(faceType);
	const hairIdNumber = Number(hairType);
	const [changeConfirmed, setChangeConfirmed] = useState(false);
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState({});

	//TODO: finish hair section
	//TODO: ensure this is pullable and put thru database to load up as an image
	//TODO: fix bug of select dropdown reset upon color change
	useEffect(() => {
		const errorsObject = {};
		faceType.length === 0 || !faceIdNumber ? errorsObject.faceIdNumber = 'Select a face type' : faceType;
		hairType.length === 0 || !hairIdNumber ? errorsObject.hairIdNumber = 'Select a hair type' : hairType;
		earType.length === 0 ? errorsObject.earType = 'Select an ear type' : earType;
		expression.length === 0 ? errorsObject.expression = 'Select an expression' : expression;
		skinType.length === 0 ? errorsObject.skinType = 'Select a skin type' : skinType;

		setErrors(errorsObject);
	}, [skinType, faceType, hairType, expression, earType])

	// Update message when a change is confirmed
	useEffect(() => {
		if (changeConfirmed) {
			if (faceType) {
				setMessage("Successfully updated eye color change!");
			} else if (hairType) {
				setMessage("Successfully updated hair color change!");
			}
		} else {
			setMessage(""); // Reset message if change is not confirmed
		}
	}, [changeConfirmed, faceType, hairType]);

	const handleAvatarSubmit = async (e) => {
		e.preventDefault();

		//!! fetch from backend once its complete

		// const createAvatar =  await dispatch(thunkCreateAvatar({
		// 	skinType, faceIdNumber, hairIdNumber, earType, expression
		// }));
		// setAvatarState(createAvatar)

		// await dispatch(thunkLoadAvatar());


		const resPost = await fetch('https://api.maplestory.net/character/render', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"skin": `${skinType}`,
				"faceId": faceIdNumber,
				"hairId": hairIdNumber,
				"pose": "walkingOneHanded",
				"poseFrame": 1,
				"faceEmote": `${expression}`,
				"faceFrame": 0,
				"ears": `${earType}`,
				"itemIds": [
					1060002,
					1040193
				],
				"effectFrame": 0
			})
		})

		const blob = await resPost.blob();
		const imageUrl = URL.createObjectURL(blob); // Create a URL for the blob object

		setAvatarState(imageUrl)


		//TODO: figure out a way after submitting the avatar, to close the modal and have it be reflected on the nav


	}
	console.log("%c 🚀 ~ file: CreateAvatar.jsx:96 ~ CreateAvatar ~ avatarState: ", "color: orange; font-size: 28px", avatarState)


	const renderFaceOptions = () => {
		// Check the selected face type and render additional options accordingly
		switch (faceType) {
			case "20000":
				return (
					<div>
						<label htmlFor="motivatedEyeColor">Select Motivated Eye Color:</label>
						<select name="motivatedEyeColor" id="motivatedEyeColor"
							value={faceType}
							onChange={(e) => {
								setFaceType(e.target.value)
								setChangeConfirmed(true)
							}}
						>
							<option value="20000">Black</option>
							<option value="20800">White</option>
							<option value="21700">Amethyst</option>
						</select>
						{message && <p>{message}</p>} {/* Display message */}

					</div>
				);
			case "20035":
				return (
					<div>
						<label htmlFor="distantGazeColor">Select Distant Gaze Color:</label>
						<select name="distantGazeColor" id="distantGazeColor">
							<option value="20035">Black</option>
							<option value="20135">Blue</option>
							<option value="20235">Red</option>
							<option value="20335">Green</option>
							<option value="20435">Hazel</option>
							<option value="20535">Sapphire</option>
							<option value="20635">Violet</option>
							<option value="20735">Amethyst</option>
							<option value="20835">White</option>
						</select>
					</div>
				);
			case "20026":
				return (
					<div>
						<label htmlFor="shutEyeColor">Select Shut Eye Color:</label>
						<select name="shutEyeColor" id="shutEyeColor">
							<option value="20026">Black</option>
							<option value="20126">Blue</option>
							<option value="20226">Red</option>
							<option value="20326">Green</option>
							<option value="20426">Hazel</option>
							<option value="20526">Sapphire</option>
							<option value="20626">Violet</option>
							<option value="20726">Amethyst</option>
							<option value="20826">White</option>
						</select>
					</div>
				);
			case "20040":
				return (
					<div>
						<label htmlFor="piercingGazeColor">Select Piercing Gaze Color:</label>
						<select name="piercingGazeColor" id="piercingGazeColor">
							<option value="20040">Black</option>
							<option value="21138">Blue</option>
							<option value="21238">Red</option>
							<option value="20340">Green</option>
							<option value="20440">Hazel</option>
							<option value="20540">Sapphire</option>
							<option value="20640">Violet</option>
							<option value="20740">Amethyst</option>
							<option value="20840">White</option>
						</select>
					</div>
				);
			default:
				return <>
					{changeConfirmed === true ? <>{message}</> : <></>}
				</>
		}
	}
	const renderHairOptions = () => {
		// Check the selected hair type and render additional options accordingly
		switch (hairType) {
			case "30025":
				return (
					<div>
						<label htmlFor="unkemptHairColor">Select Unkempt Hair Color:</label>
						<select name="unkemptHairColor" id="unkemptHairColor"
							value={hairType}
							onChange={(e) => {
								setHairType(e.target.value)
								setChangeConfirmed(true)
							}}
						>
							<option value="30020">Black</option>
							<option value="30021">Red</option>
							<option value="30022">Orange</option>
							<option value="30023">Blonde</option>
							<option value="30024">Green</option>
							<option value="30025">Blue</option>
							<option value="30026">Purple</option>
							<option value="30027">Brown</option>
						</select>
						{message && <p>{message}</p>}

					</div>
				);
			case "31490":
				return (
					<div>
						<label htmlFor="ceceliaHairColor">Select Cecelia Twist Hair Color:</label>
						<select name="ceceliaHairColor" id="ceceliaHairColor">
							<option value="31490">Black</option>
							<option value="31491">Red</option>
							<option value="31492">Orange</option>
							<option value="31493">Blonde</option>
							<option value="31494">Green</option>
							<option value="31495">Blue</option>
							<option value="31496">Purple</option>
							<option value="31497">Brown</option>
						</select>
					</div>
				);
			case "30100":
				return (
					<div>
						<label htmlFor="fantasyHairColor">Select Shut Eye Color:</label>
						<select name="fantasyHairColor" id="fantasyHairColor">
							<option value="30100">Black</option>
							<option value="30101">Red</option>
							<option value="30102">Orange</option>
							<option value="30103">Blonde</option>
							<option value="30104">Green</option>
							<option value="30105">Blue</option>
							<option value="30106">Purple</option>
							<option value="30107">Brown</option>
						</select>
					</div>
				);
			// case "20040":
			// 	return (
			// 		<div>
			// 			<label htmlFor="piercingGazeColor">Select Piercing Gaze Color:</label>
			// 			<select name="piercingGazeColor" id="piercingGazeColor">

			// 			</select>
			// 		</div>
			// 	);
			default:
				return <>
					{changeConfirmed === true ? <>{message}</> : <></>}
				</>
		}
	}
	// useEffect(() => {
	// handleAvatarSubmit() // if this is used in the useEffect, a warning will appear for preventDefault
	// }, [faceType])

	return (
		<>
			<div className='outer-avatar-creator'>
				<div className='inner-avatar-creator'>
					<div className='avatar-depiction'
						style={{
							backgroundImage: `url(${avatarState})`,
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
							width: "13.5rem",
							height: 320,
						}}
					></div>
					<div className='avatar-div-form'>
						<form onSubmit={(handleAvatarSubmit)}
							className='avatar-form'
						>
							<div className='avatar-face-adv'>

								<label className="avatar-label" htmlFor="faceType">
									<h4>Face Type</h4>
									<select name={faceType} id={faceType}
										value={faceType}
										onChange={(e) => {
											setFaceType(e.target.value)
											setChangeConfirmed(false)
										}}
										className='face-type'
									>
										<option value={""}>Select Face Type</option>
										<option value={"20000"}>Motivated Eyes</option>
										<option value={"20035"}>Distant Gaze</option>
										<option value={"20026"}>Shut Eyes</option>
										<option value={"20040"}>Piercing Gaze</option>
									</select>
									{errors?.faceIdNumber && (<p className='p-error'>{errors.faceIdNumber}</p>)}
									{/* find out why these errors for both face and hair type will not show up */}
									{renderFaceOptions()}
								</label>
							</div>
							<label className="avatar-label" htmlFor="faceExp">
								<h4>Facial Expression</h4>
								<select name={expression} id={expression}
									value={expression}
									onChange={(e) => setExpression(e.target.value)}
									className='face-exp'
								>
									<option value={""}>Select Expression</option>
									<option value={"default"}>Default</option>
									<option value={"smile"}>Smile</option>
									<option value={"glitter"}>Glitter</option>
									<option value={"shine"}>Shine</option>
									<option value={"despair"}>Despair</option>
								</select>
								{errors?.expression && (<p className='p-error'>{errors.expression}</p>)}
							</label>
							<label className="avatar-label" htmlFor="earType">
								<h4>Ears</h4>
								<select name={earType} id={earType}
									value={earType}
									onChange={(e) => setEarType(e.target.value)}
									className='ear-type'
								>
									<option value="">Select Ear Type</option>
									<option value="humanEars">Human</option>
									<option value="lefEars">Elven</option>
								</select>
								{errors?.earType && (<p className='p-error'>{errors.earType}</p>)}
							</label>
							<label className="avatar-label" htmlFor="skinType">
								<h4>Skin Tone</h4>
								<select name={skinType} id={skinType}
									value={skinType}
									onChange={(e) => setSkinType(e.target.value)}
									className='skin-type'
								>
									<option value="">Select Skin Type</option>
									<option value="tanned">Tanned</option>
									<option value="dark">Dark</option>
									<option value="clay">Clay</option>
									<option value="light">Light</option>
									<option value="ashen">Ashen</option>
								</select>
								{errors?.skinType && (<p className='p-error'>{errors.skinType}</p>)}
							</label>
							<label className="avatar-label" htmlFor="hairType">
								<h4>Hair Style</h4>
								<select name={hairType} id={hairType}
									value={hairType}
									onChange={(e) => setHairType(e.target.value)}
									className='hair-type'
								>
									<option value="">Select Hair Type</option>
									<option value={"30025"}>Unkempt Hair</option>
									<option value={"31490"}>Cecelia Twist</option>
									<option value={"30100"}>Fantasy Hair</option>
								</select>
								{errors?.hairIdNumber && (<p className='p-error'>{errors.hairIdNumber}</p>)}
								{renderHairOptions()}
							</label>
							<button
								// type='submit'
								onClick={handleAvatarSubmit}
								className='et-task-submit-button submit'
								disabled={Object.values(errors).length > 0}
							>
								Save
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)

}


export default CreateAvatar;
