import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, useContext } from 'react';
import './UserProfile.css';
import { one, two, three, four, five } from '../../clips';
import { LoggedContext } from '../../context/LoggedProvider';
import { AvatarContext } from '../../context/AvatarProvider';

import { thunkGetMaxStats } from '../../store/userStats';


function UserProfile() {
	const dispatch = useDispatch();
	const location = useLocation();
	const { user } = useContext(LoggedContext);
	const {  currAvatar } = useContext(AvatarContext);

	console.log("%c 🚀 ~ file: UserProfile.jsx:16 ~ UserProfile ~ currAvatar: ", "color: pink; font-size: 25px", currAvatar)


	console.log("%c 🚀 ~ file: UserProfile.jsx:15 ~ UserProfile ~ user: ", "color: blueviolet; font-size: 28px", user)

	let rawUserStats = useSelector(state => state.userStats);


	const userInfo = user.userStats; // this is an array containing an object, to ensure always object we select the first and only index

	console.log("%c 🚀 ~ file: UserProfile.jsx:24 ~ UserProfile ~ userInfo: ", "color: blueviolet; font-size: 25px", userInfo)

	//re-write userStat's raw state
	rawUserStats = userInfo

	// * -------------GOLD SECTION------------- *
	const storedGold = parseInt(localStorage?.getItem('gold'), 10);
	const goldenHour = rawUserStats?.gold || 0;
	// localStorage.setItem('gold', goldenHour.toString())

	const [gold, setGold] = useState(storedGold || goldenHour);
	const goldRef = useRef(storedGold);
	// console.log("%c 🚀 ~ file: UserProfile.jsx:25 ~ UserProfile ~ goldRef: ", "color: red; font-size: 25px", goldRef)

	useEffect(() => {
		setGold(storedGold);
		// also reflect it on userStats.gold
		// userInfo.gold = gold;

	}, [userInfo,
		currAvatar,
		gold, location, user, storedGold])

	useEffect(() => {
		goldRef.current = gold
	}, [gold])

	const getGoldFxn = () => {
		const storedGold = parseInt(localStorage.getItem('gold'), 10) || 0;

		setGold(storedGold)
		return storedGold
	};

	const storeGoldFxn = () => {
		setGold(prevGold => {
			prevGold = gold || prevGold;
			const updatedGold = prevGold;

			// console.log("%c 🚀 ~ file: UserProfile.jsx:48 ~ goldSetFunction ~ updatedGold: ", "color: pink; font-size: 25px", updatedGold)

			setGold(updatedGold)

			localStorage.setItem('gold', updatedGold.toString())
			return updatedGold
		})
	}

	useEffect(() => {
		getGoldFxn()
	}, [gold])

	useEffect(() => {
		storeGoldFxn()
	}, [gold])

	// * -------------LEVEL SECTION------------- *
	const level = userInfo?.level;
	console.log("%c 🚀 ~ file: UserProfile.jsx:91 ~ UserProfile ~ level: ", "color: tomato; font-size: 25px", level);

	const [currLevel, setCurrLevel] = useState(level);

	console.log("%c 🚀 ~ file: UserProfile.jsx:87 ~ UserProfile ~ currLevel: ", "color: red; font-size: 25px", currLevel)

	// * -------------HEALTH SECTION------------- *
	const healthBar = userInfo?.health;

	console.log("%c 🚀 ~ file: UserProfile.jsx:97 ~ UserProfile ~ healthBar: ", "color: crimson; font-size: 25px", healthBar, userInfo)
	const [health, setHealth] = useState(healthBar);
	const [totalHealth, setTotalHealth] = useState(0);
	const healthRef = useRef(healthBar);

	useEffect(() => {

		if (health !== healthBar) {
			if (healthBar < health) {
				// if user health is depleted from incompletion of task
				//health is replenished
				setHealth(healthBar)
				healthRef.current = healthBar
				// } else if(health < healthBar) {
			} else {
				setHealth(healthBar)
				healthRef.current = healthBar
			}

		}

	}, [location, healthBar, health])

	// console.log("%c 🚀 ~ file: UserProfile.jsx:99 ~ UserProfile ~ healthRef: ", "color: magenta; font-size: 28px", healthRef);

	// * -------------EXP SECTION------------- *
	const expBar = userInfo?.experience;

	console.log("%c 🚀 ~ file: UserProfile.jsx:144 ~ UserProfile ~ expBar: ", "color: crimson; font-size: 25px", expBar)

	const [exp, setExp] = useState(expBar);

	console.log("%c 🚀 ~ file: UserProfile.jsx:121 ~ UserProfile ~ exp: ", "color: red; font-size: 25px", exp)

	const [totalExp, setTotalExp] = useState(0);
	// const expRef = useRef(exp);


	const { maxHp, maxExp } = useSelector(state => state.userStats);


	useEffect(() => {
		// if (userInfo.experience) {
			setExp(userInfo.experience)
		// }

		setHealth(userInfo.health)
		dispatch(thunkGetMaxStats(level))
		setCurrLevel(level)
		setTotalHealth(maxHp)
		setTotalExp(maxExp)
	}, [dispatch, level, maxHp, maxExp, healthBar, healthRef, userInfo.experience, userInfo.health ])


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
				{
					currAvatar ?
						<img src={currAvatar}
							alt={user.displayName} className="spot-image-box"
						/>
						:
					<img src={randomThumbNail} alt={user.displayName} className="spot-image-box" style={imgStyle} />
				}
			</>
		)
	}

	//!! add transition for the progress bar
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
									LEVEL:
									<div className='lvl-value'>
										{currLevel}
									</div>
								</div>
								<div className="user-health stat-user">
									<div className='user-label'>
										HP:
									</div>
									<div className='user-fill'>
										<progress className='progress-bar-container' id="health" value={health} max={totalHealth}>
											{health} / {totalHealth}
										</progress>
										<div className='fill-text'>
											{health} / {totalHealth}
										</div>
									</div>
								</div>
								<div className="user-exp stat-user">
									<div className='user-label'>
										EXP:
									</div>
									<div className='user-fill'>
										<progress id="experience" value={exp} max={totalExp}>
											{exp} / {totalExp}
										</progress>
										<div className='fill-text'>
											{exp} / {totalExp}
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
