
// import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
// import { thunkLoadStats } from '../../store/stats';
import './UserProfile.css';
import { one, two, three, four, five } from '../../clips';


function UserProfile({ user }) {
	// const dispatch = useDispatch();

	// const userId = user.id;
	const userInfo = user.userStats;

	console.log("%c 🚀 ~ file: UserProfile.jsx:14 ~ UserProfile ~ userInfo: ", "color: hotpink; font-size: 25px", userInfo)

	const goldenHour = userInfo ? userInfo.gold : 0;

	const storedGold = parseInt(localStorage.getItem('gold'), 10) || goldenHour;

	console.log("%c 🚀 ~ file: UserProfile.jsx:20 ~ UserProfile ~ storedGold: ", "color: darkgoldenrod; font-size: 25px", storedGold)

	const [gold, setGold] = useState(storedGold);
	//! to return full amount of gold for testing, function useState and return storedGold
	const goldRef = useRef(gold);

	console.log("%c 🚀 ~ file: UserProfile.jsx:25 ~ UserProfile ~ goldRef: ", "color: red; font-size: 25px", goldRef)



	useEffect(() => {
		// fill out form
		// button to test look: generate avatar
		// finalize look: submit avatar
		// setCurrStat(userStat) // this will always result to undefined

		// const storedGold = parseInt(localStorage.getItem('gold'), 10) || goldenHour;


		// setGold(storedGold)
		// console.log("%c 🚀 ~ file: UserProfile.jsx:42 ~ useEffect ~ storedGold: ", "color: hotpink; font-size: 25px", storedGold)


		// ___ ^ OLD WAY ^ ___

		const updatedStoredGold = parseInt(localStorage.getItem('gold'), 10);

		if (updatedStoredGold) {
			setGold(updatedStoredGold)
		}

		const handleEventGoldStorage = (event) => {
			if (event.key === 'gold') {
				setGold(parseInt(event.newValue, 10))
			}
		}
		// Listen for changes to localStorage
		window.addEventListener('storage', handleEventGoldStorage);

		return () => {
			// Cleanup the event listener when component unmounts
			window.removeEventListener('storage', handleEventGoldStorage);
		};

	}, [])


	// useEffect(() => {

	// 	localStorage.setItem('gold', gold.toString())

	// }, [gold])

	// const userStats = Object.values(userInfo); //array of the stats under the user
	useEffect(() => {
		goldRef.current = gold
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
			one, two, three, four, five
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
