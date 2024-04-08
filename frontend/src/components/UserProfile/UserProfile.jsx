import { csrfFetch } from '../../store/csrf';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkLoadStats } from '../../store/stats';
import './UserProfile.css';



function UserProfile({ user }) {

	console.log("%c 🚀 ~ file: UserProfile.jsx:11 ~ UserProfile ~ user: ", "color: magenta; font-size: 25px", user, user.Stats)
	const userId = user.id;
	const dispatch = useDispatch();
	const userInfo = user.userStats;
	const stats = user.Stats;

	// const userStats = Object.values(userInfo); //array of the stats under the user
	const storedGold = parseInt(localStorage.getItem('gold'), 10 || 0)
	// userStats[0].gold = storedGold
	// const userStat = userStats[0];
	const taskObj = useSelector(state => state.task)
	const tasks = Object.values(taskObj);


	const [healthPercent, setHealthPercent] = useState(0);
	const [expPercent, setExpPercent] = useState(0);
	const [currStat, setCurrStat] = useState(null)



	//TODO: Create interactive buttons to complete and incomplete task causing dynamic changes in user's stats
	useEffect(() => {
		// fill out form
		// button to test look: generate avatar
		// finalize look: submit avatar
		// dispatch(thunkLoadStats())
		// setCurrStat(userStat) // this will always result to undefined
	}, [dispatch])




	return (
		<>
			<div className="user-container">

				<div className="user-info">


					<div className='user-nav-container'>
						<div className="info-container">
							[insert image]
							<div className="user-stats">
								<div className="user-lvl">

								</div>
								<div className="user-health stat-user">
									<div className='user-label'>
										HP:
									</div>
									<div className='user-fill'>
										<progress id="health" value={userInfo.health} max={userInfo.health}>
											{userInfo.health.toFixed(2)} / {userInfo.health.toFixed(2)}
										</progress>
										<div className='fill-text'>
											{userInfo.health} / {userInfo.health}
										</div>
									</div>
								</div>
								<div className="user-exp stat-user">
									<div className='user-label'>
										EXP:
									</div>
									<div className='user-fill'>
										<progress id="experience" value={userInfo.experience} max={userInfo.experience}>
											{userInfo.experience.toFixed(2)} / {userInfo.experience.toFixed(2)}
										</progress>
										<div className='fill-text'>
											{userInfo.experience} / {userInfo.experience}
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
										{storedGold ? <>{storedGold}</> : <>{userInfo?.gold}</>}
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
