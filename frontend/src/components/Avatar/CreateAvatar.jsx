import { useState, useEffect } from 'react';



import './CreateAvatar.css';

// AvatarImage component to display the avatar image
// export function AvatarImage({ avatarState }) {
// 	return (
// 		<div>
// 			<img src={avatarState} alt="Avatar" />
// 		</div>
// 	);
// }

function CreateAvatar() {
	const [avatarState, setAvatarState] = useState("");

	const [expression, setExpression] = useState("");
	const [faceType, setFaceType] = useState(0);
	const [earType, setEarType] = useState("");
	const [skinType, setSkinType] = useState("");
	const [hairType, setHairType] = useState("");
	const faceIdNumber = Number(faceType);
	const hairIdNumber = Number(hairType);
	const [changeConfirmed, setChangeConfirmed] = useState(false);
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const errorsObject = {};
		faceType.length === 0 ? errorsObject.faceType = 'Select a face type' : faceType;
		earType.length === 0 ? errorsObject.earType = 'Select an ear type' : earType;
		skinType.length === 0 ? errorsObject.skinType = 'Select a skin type' : skinType;

		setErrors(errorsObject);
	}, [skinType, faceType, earType])

	// Update message when a change is confirmed
	useEffect(() => {
		if (changeConfirmed) {
			setMessage("Successfully updated eye color change!");
		} else {
			setMessage(""); // Reset message if change is not confirmed
		}
	}, [changeConfirmed]);

	const handleAvatarSubmit = async (e) => {
		e.preventDefault();

		const resPost = await fetch('https://api.maplestory.net/character/render', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"skin": `${skinType}`,
				"faceId": faceIdNumber,
				"hairId": 30000,
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
		// .then(response => (response.blob())).then(res => console.log(res)).catch(error => console.error('Error:', error));

		const blob = await resPost.blob();
		const imageUrl = URL.createObjectURL(blob); // Create a URL for the blob object

		setAvatarState(imageUrl)

		//TODO: figure out a way after submitting the avatar, to close the modal and have it be reflected on the nav
	}


	const renderFaceOptions = () => {
		// Check the selected face type and render additional options accordingly
		switch (faceType) {
			case "20000":
				return (
					<div>
						<label htmlFor="sunsetEyeColor">Select Motivated Eye Color:</label>
						<select name="sunsetEyeColor" id="sunsetEyeColor"
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
							{/* Options for distant gaze color */}
						</select>
					</div>
				);
			case "20026":
				return (
					<div>
						<label htmlFor="shutEyeColor">Select Shut Eye Color:</label>
						<select name="shutEyeColor" id="shutEyeColor">
							{/* Options for shut eye color */}
						</select>
					</div>
				);
			case "20040":
				return (
					<div>
						<label htmlFor="piercingGazeColor">Select Piercing Gaze Color:</label>
						<select name="piercingGazeColor" id="piercingGazeColor">
							{/* Options for piercing gaze color */}
						</select>
					</div>
				);
			default:
				return <>
					{changeConfirmed === true ? <>{message}</> : <></>}
				</>
		}
	}

	useEffect(() => {
		// handleAvatarSubmit() // if this is used in the useEffect, a warning will appear for preventDefault
	}, [faceType])

	return (
		<>
			<div className='outer-avatar-creator'>
				<div className='inner-avatar-creator'>
					<div className='avatar-depiction'
						style={{
							backgroundImage: `url(${avatarState})`,
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
							width: "11.5rem",
							height: 305,
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
									{errors?.faceType && (<p className='p-error'>{errors.faceType}</p>)}
									{
										// handleFaceTypeChanges &&
										renderFaceOptions()
									}
								</label>
							</div>
							<label className="avatar-label" htmlFor="faceExp">
								<h4>Facial Expression</h4>
								<select name={expression} id={expression}
									value={expression}
									onChange={(e) => setExpression(e.target.value)}
									className='face-exp'
								>
									{/* <option value={""}>Select Expression</option> */}
									<option value={"default"}>Default</option>
									<option value={"smile"}>Smile</option>
									<option value={"glitter"}>Glitter</option>
									<option value={"shine"}>Shine</option>
									<option value={"despair"}>Despair</option>
								</select>
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
							</label>
							<label className="avatar-label" htmlFor="hairType">
								<h4>Hair Style</h4>
								<select name={hairType} id={hairType}
									value={hairType}
									onChange={(e) => setSkinType(e.target.value)}
									className='hair-type'
								>
									<option value="">Select Hair Type</option>
									<option value="tanned">Tanned</option>
									<option value="dark">Dark</option>
									<option value="clay">Clay</option>
									<option value="light">Light</option>
									<option value="ashen">Ashen</option>
								</select>
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
