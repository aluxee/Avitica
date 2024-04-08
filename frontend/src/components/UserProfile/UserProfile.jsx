
// import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
// import { thunkLoadStats } from '../../store/stats';
import './UserProfile.css';
import { one, two, three, four, five, six } from '../../clips';


function UserProfile({ user }) {

	// console.log("%c 🚀 ~ file: UserProfile.jsx:11 ~ UserProfile ~ user: ", "color: magenta; font-size: 25px", user, user.Stats)
	// const userId = user.id;
	const userInfo = user.userStats;
	// const stats = user.Stats;
	const goldFromStorage = parseInt(localStorage.getItem('gold'), 10) || userInfo.gold;
	const [gold, setGold] = useState(goldFromStorage);
	const goldRef = useRef(gold)

	// console.log("%c 🚀 ~ file: UserProfile.jsx:22 ~ UserProfile ~ goldRef: ", "color: red; font-size: 25px", goldRef)
	useEffect(() => {
		// fill out form
		// button to test look: generate avatar
		// finalize look: submit avatar
		// dispatch(thunkLoadStats())
		// setCurrStat(userStat) // this will always result to undefined
		const storedGold = parseInt(localStorage.getItem('gold'), 10 || 0)
		setGold(storedGold)
	}, [userInfo.gold])


	// const userStats = Object.values(userInfo); //array of the stats under the user
	useEffect(() => {
		goldRef.current = gold
	}, [gold])



	useEffect(() => {

		localStorage.setItem('gold', gold.toString());

	}, [gold])

	// userStats[0].gold = storedGold
	// const userStat = userStats[0];
	// const taskObj = useSelector(state => state.task)
	// const tasks = Object.values(taskObj);


	// const [healthPercent, setHealthPercent] = useState(0);
	// const [expPercent, setExpPercent] = useState(0);
	// const [currStat, setCurrStat] = useState(null)
	// //________________________________________________
	//images
	const imgStyle = {
		// backgroundImage: `${setImg}`,
		height: 80,
		width: 80,
		// marginTop: 15,
		overflow: "hidden",
		objectFit: "cover",
		overflowClipMargin: "content-box",
		// borderRadius: '15%'
	}
	const thumbNailImg = () => {

		const mpThumbNails = [
			one, two, three, four, five, six
		]
		// Generate a random index to select a photo
		const randomIndex = Math.floor(Math.random() * mpThumbNails.length);

		// Select the photo using the random index
		const randomThumbNail = mpThumbNails[randomIndex] || null;


		return (
			<>
				<img src={randomThumbNail} alt={user.displayName} className="spot-image-box" style={imgStyle} />
			</>
		)
	}
	//________________________________________________

	//TODO: Create interactive buttons to complete and incomplete task causing dynamic changes in user's stats
	//________________________________________________


	return (
		<>
			<div className="user-container">

				<div className="user-info">


					<div className='user-nav-container'>
						<div className="info-container">
							{thumbNailImg()}
							<div className="user-stats">
								<div className="user-lvl">

								</div>
								<div className="user-health stat-user">
									<div className='user-label'>
										HP:
									</div>
									<div className='user-fill'>
										<progress id="health" value={userInfo.health} max={userInfo.health}>
											{userInfo?.health} / {userInfo?.health}
										</progress>
										<div className='fill-text'>
											{userInfo?.health} / {userInfo?.health}
										</div>
									</div>
								</div>
								<div className="user-exp stat-user">
									<div className='user-label'>
										EXP:
									</div>
									<div className='user-fill'>
										<progress id="experience" value={userInfo?.experience} max={userInfo?.experience}>
											{userInfo?.experience} / {userInfo?.experience}
										</progress>
										<div className='fill-text'>
											{userInfo?.experience} / {userInfo?.experience}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="currency">
							<div className="user-gold">
								<div className='user-label'>
									Currency:
								</div>
								<div className='user-fill curr'>
									<i
										style={{ color: 'goldenrod' }} className="fa-solid fa-coins" />
									<div className='gold-amt'>
										{/* {info.gold} */}
										{gold ? <>{gold}</> : <>{userInfo?.gold}</>}
									</div>
								</div>
							</div>
						</div >
					</div>

				</div >
			</div >
		</>
	)
}




export default UserProfile;
