import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkLoadStats } from '../../store/stats';
import './UserProfile.css';



function UserProfile({ user }) {

	console.log("%c 🚀 ~ file: UserProfile.jsx:11 ~ UserProfile ~ user: ", "color: red; font-size: 25px", user)

	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.stats)
	const [healthPercent, setHealthPercent] = useState(0);
	const [expPercent, setExpPercent] = useState(0);

	const userStats = Object.values(userInfo)

	useEffect(() => {
		// fill out form
		// button to test look: generate avatar
		// finalize look: submit avatar
		dispatch(thunkLoadStats())
	}, [dispatch])

	useEffect(() => {
		const fetchUserStats = async () => {
			try {
				// Fetch user's stats from the backend
				const response = await fetch('/api/user/stats', {
					method: 'GET',
					credentials: 'include', // Include credentials if required
				});

				if (!response.ok) {
					throw new Error('Failed to fetch user stats');
				}

				const data = await response.json();

				if (data.userStats) {
					// Calculate health and exp percentages based on user's level
					const level = data.userStats.getLevel();
					const defaultHealth = data.userStats.calcDefaultHealth(level);
					const defaultExperience = data.userStats.calcDefaultExperience(level);
					const healthPercent = (data.userStats.health / defaultHealth) * 100;
					const expPercent = (data.userStats.experience / defaultExperience) * 100;

					// Update state with health and exp percentages
					setHealthPercent(healthPercent);
					setExpPercent(expPercent);
				}
			} catch (error) {
				console.error('Error fetching user stats:', error.message);
			}
		};

		// Call fxn
		fetchUserStats();
	}, [healthPercent, expPercent])

	const storedGold = parseInt(localStorage.getItem('gold'), 10 || 0)

	console.log("%c 🚀 ~ file: UserProfile.jsx:64 ~ UserProfile ~ storedGold: ", "color: green; font-size: 35px", storedGold)



	return (
		<>
			<div className="user-container">

				<div className="user-info">
					{userStats.length > 0 && userStats.map((info, index) => (
						<div className='user-nav-container' key={index}>
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
											<progress id="health" value={info.health} max={info.health}>
												{info.health.toFixed(2)} / {info.health.toFixed(2)}
											</progress>
											<div className='fill-text'>
												{info.health} / {info.health}
											</div>
										</div>
									</div>
									<div className="user-exp stat-user">
										<div className='user-label'>
											EXP:
										</div>
										<div className='user-fill'>
											<progress id="experience" value={info.experience} max={info.experience}>
												{info.experience.toFixed(2)} / {info.experience.toFixed(2)}
											</progress>
											<div className='fill-text'>
												{info.experience} / {info.experience}
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
											{storedGold}
										</div>
									</div>
								</div>
							</div >
						</div>
					))}
				</div >
			</div >
		</>
	)
}




export default UserProfile;
