import { useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux;
import { useEffect, useState, useRef } from 'react';
// import { thunkLoadStats } from '../../store/stats';
import './UserProfile.css';
import { one, two, three, four, five } from '../../clips';


function UserProfile({ user }) {

	console.log("%c 🚀 ~ file: UserProfile.jsx:11 ~ UserProfile ~ user: ", "color: blueviolet; font-size: 25px", user)

	const location = useLocation();
	const userInfo = user.userStats;
	console.log("%c 🚀 ~ file: UserProfile.jsx:12 ~ UserProfile ~ userInfo: ", "color: hotpink; font-size: 25px", userInfo)

	// * -------------GOLD SECTION------------- *
	const goldenHour = userInfo ? userInfo.gold : 0;
	console.log("%c 🚀 ~ file: UserProfile.jsx:19 ~ UserProfile ~ goldenHour: ", "color: hotpink; font-size: 25px", goldenHour, "and just in case ..., ", userInfo.gold)

	const storedGold = parseInt(localStorage.getItem('gold'), 10) || goldenHour;
	console.log("%c 🚀 ~ file: UserProfile.jsx:20 ~ UserProfile ~ storedGold: ", "color: darkgoldenrod; font-size: 25px", storedGold)

	const [gold, setGold] = useState(storedGold);
	const goldRef = useRef(gold);
	console.log("%c 🚀 ~ file: UserProfile.jsx:25 ~ UserProfile ~ goldRef: ", "color: red; font-size: 25px", goldRef)

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

			console.log("%c 🚀 ~ file: UserProfile.jsx:48 ~ goldSetFunction ~ updatedGold: ", "color: pink; font-size: 25px", updatedGold)

			setGold(updatedGold)
			localStorage.setItem('gold', updatedGold.toString())
			return updatedGold
		})
	}

	useEffect(() => {
		getGoldFxn()
	}, [])

	useEffect(() => {
		storeGoldFxn()
	}, [])

	// useEffect(() => {
		// fill out form
		// button to test look: generate avatar
		// finalize look: submit avatar
		// setCurrStat(userStat) // this will always result to undefined

	// })

	useEffect(() => {
		const storedGold = parseInt(localStorage.getItem('gold'), 10) || 0;

		setGold(storedGold);

		// ___  OTHER WAY  ___

		// const updatedStoredGold = parseInt(localStorage.getItem('gold'), 10);

		// if (updatedStoredGold) {
		// 	setGold(updatedStoredGold)
		// }

		// const handleEventGoldStorage = (event) => {
		// 	if (event.key === 'gold') {
		// 		setGold(parseInt(event.newValue, 10))
		// 	}
		// }

		// // Listen for changes to localStorage
		// window.addEventListener('storage', handleEventGoldStorage(event));

		// return () => {
		// 	// Cleanup the event listener when component unmounts
		// 	window.removeEventListener('storage', handleEventGoldStorage);
		// };

	}, [gold, location])
	// * -------------HEALTH SECTION------------- *
	const healthBar = userInfo.health ? userInfo.health : 100;

	console.log("%c 🚀 ~ file: UserProfile.jsx:97 ~ UserProfile ~ healthBar: ", "color: crimson; font-size: 25px", healthBar)

	// console.log("%c 🚀 ~ file: UserProfile.jsx:100 ~ UserProfile ~ storedHealth: ", "color: crimson; font-size: 25px", storedHealth)

	const [health, setHealth] = useState('');
	const [currHealth, setCurrHealth] = useState('');
	const healthRef = useRef(health);

	useEffect(() => {
		healthRef.current = health;
		const storedHealth = parseInt(localStorage.getItem('health'), 10) || healthBar;
		setHealth(storedHealth);
	}, [health, location])

	// const getHealth = () => {


	// 	console.log("%c 🚀 ~ file: UserProfile.jsx:112 ~ getHealth ~ storedHealth: ", "color: red; font-size: 25px", storedHealth) // yields 215

	// 	setHealth(storedHealth)
	// 	return storedHealth
	// };

	const storeHealth = () => {
		setHealth(prevHealth => {
			prevHealth = health || prevHealth;
			const updatedHealth = prevHealth;

			console.log("%c 🚀 ~ file: UserProfile.jsx:113 ~ goldSetFunction ~ updatedGold: ", "color: pink; font-size: 25px", updatedHealth)

			setHealth(updatedHealth)
			localStorage.setItem('health', updatedHealth.toString())
			return updatedHealth
		})
	}
	// useEffect(() => {
	// 	getHealth()
	// }, [])

	useEffect(() => {
		storeHealth()
	}, [healthBar])

	// * -------------EXP SECTION------------- *
	const expBar = userInfo.experience ? userInfo.experience : 0;

	console.log("%c 🚀 ~ file: UserProfile.jsx:144 ~ UserProfile ~ expBar: ", "color: crimson; font-size: 25px", expBar)

	const [exp, setExp] = useState('');
	const [currExp, setCurrExp] = useState('');
	const expRef = useRef(exp);

	useEffect(() => {
		expRef.current = exp;
		const storedExp = parseInt(localStorage.getItem('exp'), 10) || expBar;
		setExp(storedExp);
	}, [exp, location])

	// const getExp = () => {

	// 	setExp(storedExp)
	// 	return storedExp
	// };

	const storeExp = () => {
		setExp(prevXP => {
			prevXP = exp || prevXP;
			const updatedExp = prevXP;

			console.log("%c 🚀 ~ file: UserProfile.jsx:167 ~ goldSetFunction ~ updatedExp: ", "color: pink; font-size: 25px", updatedExp)

			setExp(updatedExp)
			localStorage.setItem('exp', updatedExp.toString())
			return updatedExp
		})
	}

	// useEffect(() => {
	// 	getHealth()
	// }, [])

	useEffect(() => {
		storeExp()
	}, [])




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
										<progress id="health" value={health} max={health}>
											{health} / {health}
										</progress>
										<div className='fill-text'>
											{health} / {health}
										</div>
									</div>
								</div>
								<div className="user-exp stat-user">
									<div className='user-label'>
										EXP:
									</div>
									<div className='user-fill'>
										<progress id="experience" value={exp} max={exp}>
											{exp} / {exp}
										</progress>
										<div className='fill-text'>
											{exp} / {exp}
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
